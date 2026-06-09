import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { parse as parseYaml } from "yaml";
import { REGIONS, type Region } from "./schema.js";

/**
 * Region HVAC supplier/provider & official-manual-source directory.
 * This is *directory metadata* — OEMs, regional suppliers, provider routes, and links to the OEMs'
 * own official manual/portal pages. Siyana never hosts or reproduces manual content; it points to
 * the authoritative source. Safe, factual, cited data — grow it via PRs.
 */

export const PROVIDERS_DIR = fileURLToPath(new URL("../reference/providers", import.meta.url));

const ManualSchema = z
  .object({
    url: z.string().url(),
    type: z.string().optional(),
    coverage: z.string().optional(),
    access: z.string().optional(),
    verification: z.string().optional(),
    version: z.string().optional(),
    language: z.string().optional(),
  })
  .passthrough();

export const ProviderSchema = z
  .object({
    id: z.string().min(1),
    equipment_category: z.string().min(1),
    equipment_family: z.string().optional(),
    model_or_family: z.string().optional(),
    oem: z.string().min(1),
    supplier: z.string().optional(),
    provider_type: z.string().optional(),
    emirates_focus: z.string().optional(),
    presence_evidence: z.string().optional(),
    supplier_website: z.string().optional(),
    product_page: z.string().optional(),
    manual: ManualSchema.optional(),
    confidence: z.string().optional(),
    sources: z.array(z.string()).default([]),
    notes: z.string().optional(),
    last_reviewed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  })
  .passthrough();

export type Provider = z.infer<typeof ProviderSchema>;

const DocSchema = z
  .object({
    region: z.string().optional(),
    description: z.string().optional(),
    last_reviewed: z.string().optional(),
    providers: z.array(ProviderSchema),
  })
  .passthrough();

/** Load reference/providers/<region>.yaml for every region that has one. Throws on invalid files. */
export function loadProviders(dir: string = PROVIDERS_DIR): Map<Region, Provider[]> {
  const out = new Map<Region, Provider[]>();
  if (!existsSync(dir)) return out;

  for (const file of readdirSync(dir).filter((f) => /\.ya?ml$/i.test(f))) {
    const region = basename(file).replace(/\.ya?ml$/i, "");
    if (!(REGIONS as readonly string[]).includes(region)) {
      throw new Error(`providers file "${file}" is not a known region (${REGIONS.join(", ")})`);
    }
    const parsed = DocSchema.safeParse(parseYaml(readFileSync(join(dir, file), "utf8")));
    if (!parsed.success) {
      const issues = parsed.error.issues.map((i) => `  - ${i.path.join(".")}: ${i.message}`).join("\n");
      throw new Error(`providers file "${file}" failed validation:\n${issues}`);
    }
    out.set(region as Region, parsed.data.providers);
  }
  return out;
}
