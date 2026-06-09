import { describe, it, expect, beforeAll } from "vitest";
import { loadAssets, type LoadResult } from "../src/data-loader.js";
import { buildTools } from "../src/tools/index.js";
import type { ToolDef } from "../src/tools/types.js";

let store: LoadResult;
let tools: Map<string, ToolDef>;

function call(name: string, args: Record<string, unknown> = {}) {
  const tool = tools.get(name);
  if (!tool) throw new Error(`tool ${name} not found`);
  const result = tool.handler(args);
  const text = result.content.map((c) => c.text).join("\n");
  return { result, text, data: result.isError ? null : JSON.parse(text) };
}

beforeAll(() => {
  store = loadAssets();
  // No weather client → offline: only the knowledge tools are built (what this suite exercises).
  const ctx = {
    store,
    defaultRegion: "gcc" as const,
    availableRegions: store.availableRegions,
    benchmarks: new Map(),
  };
  tools = new Map(buildTools(ctx).map((t) => [t.name, t]));
});

describe("data + tooling", () => {
  it("loads the bundled knowledge base", () => {
    expect(store.assets.length).toBeGreaterThanOrEqual(15);
  });

  it("registers the offline knowledge tools (no weather client)", () => {
    expect([...tools.keys()].sort()).toEqual(
      [
        "get_asset_spec",
        "get_fault_resolution",
        "get_ppm_schedule",
        "list_asset_categories",
        "search_assets",
      ].sort(),
    );
  });
});

describe("list_asset_categories", () => {
  it("returns the three trades with assets", () => {
    const { data } = call("list_asset_categories");
    expect(data.trades.map((t: { trade: string }) => t.trade)).toEqual([
      "hvac",
      "electrical",
      "plumbing",
    ]);
    expect(data.total_assets).toBe(store.assets.length);
  });

  it("reports the region scope and available regions", () => {
    const { data } = call("list_asset_categories");
    expect(data.regions.default).toBe("gcc");
    expect(data.regions.available).toContain("gcc");
  });
});

describe("search_assets", () => {
  it("finds an asset by brand/model", () => {
    const { data } = call("search_assets", { query: "Daikin VRV" });
    expect(data.matches.map((m: { id: string }) => m.id)).toContain("hvac-vrf-system");
  });

  it("respects the trade filter", () => {
    const { data } = call("search_assets", { query: "pump", trade: "plumbing" });
    expect(data.matches.length).toBeGreaterThan(0);
    expect(data.matches.every((m: { trade: string }) => m.trade === "plumbing")).toBe(true);
  });
});

describe("get_asset_spec", () => {
  it("returns specs, sources, and last_reviewed for a known asset", () => {
    const { data } = call("get_asset_spec", { id: "hvac-chiller-air-cooled" });
    expect(data.asset_type).toMatch(/chiller/i);
    expect(data.sources.length).toBeGreaterThan(0);
    expect(data.last_reviewed).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("filters models when a brand is given, each with a manual link", () => {
    const { data } = call("get_asset_spec", { id: "hvac-vrf-system", brand: "Daikin" });
    expect(data.models.length).toBeGreaterThan(0);
    expect(data.models.every((m: { brand: string }) => /daikin/i.test(m.brand))).toBe(true);
    expect(data.models[0].manual?.url).toMatch(/^https?:\/\//);
  });

  it("errors on an unknown id", () => {
    const { result, text } = call("get_asset_spec", { id: "does-not-exist" });
    expect(result.isError).toBe(true);
    expect(text).toMatch(/No equipment category/);
  });
});

describe("get_ppm_schedule", () => {
  it("resolves region notes for the default (gcc) scope", () => {
    const { data } = call("get_ppm_schedule", { id: "hvac-chiller-air-cooled" });
    expect(data.region).toBe("gcc");
    expect(data.ppm.length).toBeGreaterThan(0);
    expect(data.ppm.some((t: { note?: string }) => !!t.note)).toBe(true);
  });

  it("errors for a region with no dataset yet (e.g. uk)", () => {
    const { result, text } = call("get_ppm_schedule", {
      id: "hvac-chiller-air-cooled",
      region: "uk",
    });
    expect(result.isError).toBe(true);
    expect(text).toMatch(/in region "uk"/);
  });
});

describe("region isolation", () => {
  it("search is scoped to the active region — uk dataset is empty", () => {
    const { data } = call("search_assets", { query: "chiller", region: "uk" });
    expect(data.region).toBe("uk");
    expect(data.count).toBe(0);
  });

  it("every loaded asset is tagged with its region", () => {
    expect(store.assets.every((a) => a.region === "gcc")).toBe(true);
    expect(store.availableRegions).toEqual(["gcc"]);
  });
});

describe("get_fault_resolution", () => {
  it("matches a symptom to the right fault", () => {
    const { data } = call("get_fault_resolution", {
      id: "hvac-chiller-air-cooled",
      symptom: "high pressure trip",
    });
    expect(data.faults.length).toBeGreaterThan(0);
    expect(data.faults[0].symptom).toMatch(/high.*pressure/i);
    expect(data.faults[0].resolution_steps.length).toBeGreaterThan(0);
  });

  it("lists all faults when no symptom is given", () => {
    const { data } = call("get_fault_resolution", { id: "hvac-chiller-air-cooled" });
    expect(data.symptom).toBeNull();
    expect(data.faults.length).toBeGreaterThan(0);
  });
});

describe("data integrity", () => {
  it("every asset cites at least one source and has unique id", () => {
    const ids = new Set<string>();
    for (const a of store.assets) {
      expect(a.sources.length).toBeGreaterThan(0);
      expect(ids.has(a.id)).toBe(false);
      ids.add(a.id);
    }
  });
});
