import { describe, it, expect, beforeAll } from "vitest";
import { coolingDegreeDays, daysInSeason, seasonMonths, type DailyTemp } from "../src/weather/degree-days.js";
import { estimateCoolingEnergy, sqftToM2 } from "../src/weather/energy.js";
import { buildAdvisories } from "../src/weather/advisory.js";
import { loadBenchmarks } from "../src/benchmarks.js";
import { loadAssets, type LoadResult } from "../src/data-loader.js";
import { buildTools } from "../src/tools/index.js";
import type { ToolDef } from "../src/tools/types.js";
import type { WeatherClient } from "../src/weather/open-meteo.js";

describe("degree-days", () => {
  const days: DailyTemp[] = [
    { date: "2025-07-01", tmax_c: 44, tmin_c: 32 }, // mean 38 → 20 over base 18
    { date: "2025-07-02", tmax_c: 40, tmin_c: 28 }, // mean 34 → 16
    { date: "2025-01-15", tmax_c: 22, tmin_c: 14 }, // mean 18 → 0
  ];

  it("sums cooling degree-days above the base", () => {
    expect(coolingDegreeDays(days, 18)).toBe(36);
  });

  it("never goes negative", () => {
    expect(coolingDegreeDays([{ date: "2025-01-01", tmax_c: 10, tmin_c: 0 }], 18)).toBe(0);
  });

  it("maps seasons to months and flips by hemisphere", () => {
    expect(seasonMonths("summer", 25)).toEqual([6, 7, 8, 9]);
    expect(seasonMonths("summer", -25)).toEqual([12, 1, 2]);
  });

  it("filters days to the season", () => {
    expect(daysInSeason(days, "summer", 25)).toHaveLength(2);
    expect(daysInSeason(days, "annual", 25)).toHaveLength(3);
  });
});

describe("energy estimate", () => {
  it("converts sqft to m²", () => {
    expect(Math.round(sqftToM2(10000))).toBe(929);
  });

  it("allocates annual EUI by the CDD ratio", () => {
    const e = estimateCoolingEnergy({
      area_m2: 929,
      cooling_eui_typical: 120,
      cooling_eui_low: 90,
      cooling_eui_high: 160,
      period_cdd: 1650,
      reference_annual_cdd: 3300,
      cooling_load_w_per_m2: 120,
      tariff_per_kwh: 0.3,
    });
    // 929 * 120 * (1650/3300=0.5) = 55,740
    expect(e.estimate_kwh).toBe(55740);
    expect(e.cdd_ratio).toBe(0.5);
    expect(e.low_kwh).toBeLessThan(e.estimate_kwh);
    expect(e.high_kwh).toBeGreaterThan(e.estimate_kwh);
    expect(e.indicative_peak_cooling_tr).toBeGreaterThan(0);
    expect(e.estimate_cost).toBe(Math.round(55740 * 0.3));
  });
});

describe("advisories", () => {
  it("raises a high-heat advisory in extreme heat", () => {
    const a = buildAdvisories({ maxTempC: 51, minTempC: 34 });
    expect(a.some((x) => x.severity === "high" && x.trades.includes("hvac"))).toBe(true);
  });

  it("flags dust and humidity", () => {
    const a = buildAdvisories({ maxTempC: 38, minTempC: 28, maxHumidityPct: 82, maxDust: 500 });
    expect(a.some((x) => x.keywords.includes("filter"))).toBe(true);
    expect(a.some((x) => x.keywords.includes("condensate"))).toBe(true);
  });

  it("returns nothing in mild conditions", () => {
    expect(buildAdvisories({ maxTempC: 28, minTempC: 18, maxHumidityPct: 40 })).toEqual([]);
  });
});

describe("benchmarks", () => {
  it("loads the GCC benchmark with an office building type", () => {
    const b = loadBenchmarks();
    expect(b.has("gcc")).toBe(true);
    expect(b.get("gcc")!.building_types.office.cooling_eui_kwh_m2_yr.typical).toBeGreaterThan(0);
  });
});

describe("estimate_cooling_energy tool (mock weather client)", () => {
  let store: LoadResult;
  let tools: Map<string, ToolDef>;

  // Deterministic fake client: a year that is hot in summer, mild otherwise.
  const fakeClient: WeatherClient = {
    async geocode(name) {
      return { name, country: "UAE", country_code: "AE", latitude: 25.2, longitude: 55.3, timezone: "auto" };
    },
    async forecast() {
      return { current: { temperature_c: 42, humidity_pct: 55, wind_speed_kmh: 12 }, daily: [] };
    },
    async trailingYear() {
      const days = [];
      for (let m = 1; m <= 12; m++) {
        const hot = m >= 6 && m <= 9;
        for (let d = 1; d <= 28; d++) {
          const mm = String(m).padStart(2, "0");
          const dd = String(d).padStart(2, "0");
          days.push({ date: `2025-${mm}-${dd}`, tmax_c: hot ? 44 : 26, tmin_c: hot ? 32 : 16 });
        }
      }
      return days;
    },
    async maxDust() {
      return undefined;
    },
  };

  beforeAll(() => {
    store = loadAssets();
    const ctx = {
      store,
      defaultRegion: "gcc" as const,
      availableRegions: store.availableRegions,
      benchmarks: loadBenchmarks(),
      weather: fakeClient,
    };
    tools = new Map(buildTools(ctx).map((t) => [t.name, t]));
  });

  it("registers the weather tools when a client is present", () => {
    expect(tools.has("get_weather")).toBe(true);
    expect(tools.has("estimate_cooling_energy")).toBe(true);
    expect(tools.has("get_maintenance_advisory")).toBe(true);
  });

  it("estimates summer cooling energy for a 10,000 sqft office", async () => {
    const res = await tools.get("estimate_cooling_energy")!.handler({
      location: "Dubai",
      area_sqft: 10000,
      building_type: "office",
      period: "summer",
    });
    const data = JSON.parse(res.content[0].text);
    expect(res.isError).toBeFalsy();
    expect(data.building_type).toBe("office");
    expect(data.area_m2).toBe(929);
    expect(data.cooling_degree_days.period).toBeGreaterThan(0);
    expect(data.estimate_kwh).toBeGreaterThan(0);
    expect(data.confidence).toMatch(/indicative/);
    expect(data.sources.join(" ")).toMatch(/Open-Meteo/);
  });

  it("errors on an unknown building type", async () => {
    const res = await tools.get("estimate_cooling_energy")!.handler({
      location: "Dubai",
      area_sqft: 10000,
      building_type: "spaceship",
    });
    expect(res.isError).toBe(true);
    expect(res.content[0].text).toMatch(/Unknown building_type/);
  });
});
