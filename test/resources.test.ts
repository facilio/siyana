import { describe, it, expect } from "vitest";
import { loadAssets } from "../src/data-loader.js";
import { buildAssetResources, renderAssetMarkdown } from "../src/resources.js";
import { PROMPTS } from "../src/prompts.js";

const store = loadAssets();

describe("MCP resources", () => {
  it("exposes one resource per category with a siyana:// uri", () => {
    const res = buildAssetResources(store);
    expect(res.length).toBe(store.assets.length);
    expect(res.every((r) => /^siyana:\/\/gcc\/[a-z0-9-]+$/.test(r.uri))).toBe(true);
  });

  it("renders a category as markdown with the key sections", () => {
    const chiller = store.get("gcc", "hvac-chiller-air-cooled")!;
    const md = renderAssetMarkdown(chiller, store.modelsFor("gcc", chiller.id));
    expect(md).toMatch(/^# Air-Cooled Chiller/);
    expect(md).toMatch(/## PPM schedule/);
    expect(md).toMatch(/## Common faults/);
    expect(md).toMatch(/## Brands & official manuals/);
    expect(md).toMatch(/\[manual\]\(https?:\/\//);
  });
});

describe("MCP prompts", () => {
  it("registers ppm-plan, fault-triage and spec-lookup", () => {
    expect(PROMPTS.map((p) => p.name).sort()).toEqual(["fault-triage", "ppm-plan", "spec-lookup"]);
  });

  it("builds a user prompt that names the asset", () => {
    const ppm = PROMPTS.find((p) => p.name === "ppm-plan")!;
    const text = ppm.build({ asset: "air-cooled chiller", region: "gcc" });
    expect(text).toMatch(/air-cooled chiller/);
    expect(text).toMatch(/get_ppm_schedule/);
  });
});
