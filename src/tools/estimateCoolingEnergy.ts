import { z } from "zod";
import { errorResult, json, regionInput, resolveRegion, type ToolFactory } from "./types.js";
import { coolingDegreeDays, daysInSeason, type Season } from "../weather/degree-days.js";
import { estimateCoolingEnergy as computeEnergy, sqftToM2 } from "../weather/energy.js";

export const estimateCoolingEnergy: ToolFactory = (ctx) => ({
  name: "estimate_cooling_energy",
  description:
    "Estimate the cooling electricity for a space using live climate data: pulls cooling-degree-days for the location from Open-Meteo and applies a cited region/building-type energy-intensity benchmark. INDICATIVE only (±~25%) — not a substitute for an MEP load calculation. Needs network access.",
  inputShape: {
    location: z.string().min(1).describe("City name or 'City, Country', e.g. 'Dubai'."),
    area_sqft: z.number().positive().optional().describe("Conditioned floor area in square feet."),
    area_m2: z.number().positive().optional().describe("Conditioned floor area in m² (alternative to area_sqft)."),
    building_type: z.string().min(1).describe("e.g. office, retail, hotel, residential, hospital, mall, warehouse."),
    period: z.enum(["summer", "winter", "annual"]).optional().describe("Period to estimate (default summer)."),
    tariff_per_kwh: z.number().positive().optional().describe("Optional electricity tariff to also return an indicative cost."),
    region: regionInput,
  },
  handler: async (args) => {
    if (!ctx.weather) return errorResult("Weather tools are disabled (server is running offline).");

    const region = resolveRegion(ctx, args);
    const benchmark = ctx.benchmarks.get(region);
    if (!benchmark) {
      return errorResult(
        `No energy benchmarks for region "${region}" yet. Available: ${[...ctx.benchmarks.keys()].join(", ") || "none"}.`,
      );
    }

    const buildingType = String(args.building_type ?? "").toLowerCase();
    const bt = benchmark.building_types[buildingType];
    if (!bt) {
      return errorResult(
        `Unknown building_type "${buildingType}" for region "${region}". Available: ${Object.keys(benchmark.building_types).join(", ")}.`,
      );
    }

    const area_m2 =
      typeof args.area_m2 === "number"
        ? args.area_m2
        : typeof args.area_sqft === "number"
          ? sqftToM2(args.area_sqft)
          : undefined;
    if (area_m2 === undefined) return errorResult("Provide area_sqft or area_m2.");

    const period = (args.period as Season) ?? "summer";
    const tariff = typeof args.tariff_per_kwh === "number" ? args.tariff_per_kwh : undefined;

    try {
      const geo = await ctx.weather.geocode(String(args.location ?? ""));
      if (!geo) return errorResult(`Could not find location "${args.location}". Try 'City, Country'.`);

      const year = await ctx.weather.trailingYear(geo.latitude, geo.longitude, new Date());
      if (year.length < 300) {
        return errorResult("Not enough historical weather data returned to estimate degree-days.");
      }
      const annualCdd = coolingDegreeDays(year, benchmark.cdd_base_c);
      const periodDays = daysInSeason(year, period, geo.latitude);
      const periodCdd = coolingDegreeDays(periodDays, benchmark.cdd_base_c);

      const estimate = computeEnergy({
        area_m2,
        cooling_eui_typical: bt.cooling_eui_kwh_m2_yr.typical,
        cooling_eui_low: bt.cooling_eui_kwh_m2_yr.low,
        cooling_eui_high: bt.cooling_eui_kwh_m2_yr.high,
        period_cdd: periodCdd,
        reference_annual_cdd: benchmark.reference_annual_cdd,
        cooling_load_w_per_m2: bt.cooling_load_w_per_m2,
        tariff_per_kwh: tariff,
      });

      return json({
        location: `${geo.name}, ${geo.country_code}`,
        region,
        building_type: buildingType,
        period,
        area_m2: Math.round(area_m2),
        cooling_degree_days: { period: Math.round(periodCdd), trailing_year: Math.round(annualCdd), base_c: benchmark.cdd_base_c },
        benchmark_cooling_eui_kwh_m2_yr: bt.cooling_eui_kwh_m2_yr,
        estimate_kwh: estimate.estimate_kwh,
        range_kwh: estimate.low_kwh !== undefined ? { low: estimate.low_kwh, high: estimate.high_kwh } : null,
        indicative_peak_cooling_tr: estimate.indicative_peak_cooling_tr ?? null,
        estimate_cost: estimate.estimate_cost ?? null,
        confidence: "indicative ±~25% — degree-day × benchmark method; not a substitute for an MEP load calculation",
        assumptions: [
          "Cooling energy allocated from an annual EUI benchmark by the ratio of period CDD to the region's reference annual CDD.",
          `Building-type benchmark for "${buildingType}" in region "${region}"; actual consumption varies with envelope, efficiency, occupancy, and operation.`,
          bt.note ?? null,
        ].filter(Boolean),
        sources: [...benchmark.sources, "Weather data by Open-Meteo.com (CC BY 4.0)."],
      });
    } catch (err) {
      return errorResult((err as Error).message);
    }
  },
});
