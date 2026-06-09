import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { parse as parseYaml } from "yaml";
import { REGIONS, type Region } from "./schema.js";

/**
 * Region energy benchmarks used by the cooling-energy estimator. These are *indicative*,
 * community-maintained figures synthesised from public methodology (ASHRAE 90.1, CIBSE TM46,
 * regional energy studies) — not measured values. Refine them via PRs.
 */

export const BENCHMARKS_DIR = fileURLToPath(new URL("../reference/benchmarks", import.meta.url));

const EuiSchema = z
  .object({
    typical: z.number().positive(),
    low: z.number().positive().optional(),
    high: z.number().positive().optional(),
  })
  .strict();

const BuildingTypeSchema = z
  .object({
    /** Annual cooling energy-use intensity, kWh/m²/yr. */
    cooling_eui_kwh_m2_yr: EuiSchema,
    /** Peak cooling-load density, W/m² (for an indicative plant-size figure). */
    cooling_load_w_per_m2: z.number().positive().optional(),
    note: z.string().optional(),
  })
  .strict();

export const BenchmarkSchema = z
  .object({
    /** Base temperature for cooling degree-days, °C. */
    cdd_base_c: z.number().default(18),
    /** Regional reference annual CDD the EUI figures are calibrated against. */
    reference_annual_cdd: z.number().positive(),
    building_types: z.record(z.string(), BuildingTypeSchema),
    sources: z.array(z.string().min(1)).min(1),
    last_reviewed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  })
  .strict();

export type Benchmark = z.infer<typeof BenchmarkSchema>;

/** Load reference/benchmarks/<region>.yaml for every region that has one. Throws on invalid files. */
export function loadBenchmarks(dir: string = BENCHMARKS_DIR): Map<Region, Benchmark> {
  const out = new Map<Region, Benchmark>();
  if (!existsSync(dir)) return out;

  for (const file of readdirSync(dir).filter((f) => /\.ya?ml$/i.test(f))) {
    const region = basename(file).replace(/\.ya?ml$/i, "");
    if (!(REGIONS as readonly string[]).includes(region)) {
      throw new Error(`benchmark file "${file}" is not a known region (${REGIONS.join(", ")})`);
    }
    const parsed = BenchmarkSchema.safeParse(parseYaml(readFileSync(join(dir, file), "utf8")));
    if (!parsed.success) {
      const issues = parsed.error.issues.map((i) => `  - ${i.path.join(".")}: ${i.message}`).join("\n");
      throw new Error(`benchmark file "${file}" failed validation:\n${issues}`);
    }
    out.set(region as Region, parsed.data);
  }
  return out;
}
