import { z } from "zod";

/**
 * Source of truth for the shape of every asset knowledge file in `data/`.
 * The JSON Schema used by CI and contributors is generated from this (see scripts/gen-schema.ts),
 * and the loader validates every YAML file against it at startup (see data-loader.ts).
 */

export const TRADES = ["hvac", "electrical", "plumbing"] as const;
export const TradeSchema = z.enum(TRADES);
export type Trade = z.infer<typeof TradeSchema>;

/**
 * Regions Siyana can be scoped to. Each region is its own dataset under `data/<region>/`, and the
 * server is scoped to one region via the SIYANA_REGION environment variable (default `gcc`). Tools
 * only ever read from the active region's dataset. Adding a region = adding a `data/<region>/` folder.
 */
export const REGIONS = ["gcc", "uk", "us", "anz", "eu"] as const;
export const RegionSchema = z.enum(REGIONS);
export type Region = z.infer<typeof RegionSchema>;
export const DEFAULT_REGION: Region = "gcc";

const SpecSchema = z
  .object({
    key: z.string().min(1),
    value: z.string().min(1),
  })
  .strict();

const PpmTaskSchema = z
  .object({
    task: z.string().min(1),
    frequency: z.string().min(1),
    /** Region-specific adjustment for this task (climate/regulatory). The region is the dataset folder. */
    note: z.string().min(1).optional(),
    /** Reference to a standard by name/clause — never reproduced verbatim. */
    standard_ref: z.string().optional(),
  })
  .strict();

const FaultSchema = z
  .object({
    symptom: z.string().min(1),
    likely_causes: z.array(z.string().min(1)).min(1),
    resolution_steps: z.array(z.string().min(1)).min(1),
    safety_notes: z.string().optional(),
  })
  .strict();

export const AssetSchema = z
  .object({
    /** Stable, unique, kebab-case identifier, e.g. "hvac-vrf-system". */
    id: z
      .string()
      .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "id must be kebab-case (lowercase, hyphen-separated)"),
    trade: TradeSchema,
    asset_type: z.string().min(1),
    aliases: z.array(z.string().min(1)).default([]),
    specifications: z.array(SpecSchema).default([]),
    ppm: z.array(PpmTaskSchema).default([]),
    common_faults: z.array(FaultSchema).default([]),
    /** Public sources / standards this entry was synthesised from. At least one required. */
    sources: z.array(z.string().min(1)).min(1, "every asset must cite at least one source"),
    /** ISO date (YYYY-MM-DD) the entry was last reviewed for accuracy. */
    last_reviewed: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "last_reviewed must be an ISO date (YYYY-MM-DD)"),
    license: z.literal("CC-BY-4.0").default("CC-BY-4.0"),
  })
  .strict();

export type Asset = z.infer<typeof AssetSchema>;

/**
 * A brand/model under an equipment category — e.g. equipments/<category>/<brand>/<model>.yaml.
 * Holds model-specific specs and a LINK to the OEM's official manual (never the manual content).
 */
export const ManualLinkSchema = z
  .object({
    url: z.string().url(),
    type: z.string().optional(),
    access: z.string().optional(),
    coverage: z.string().optional(),
  })
  .strict();

export const ModelSchema = z
  .object({
    /** The category id this model belongs to, e.g. "hvac-chiller-air-cooled". */
    category_id: z
      .string()
      .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "category_id must be kebab-case"),
    brand: z.string().min(1),
    model: z.string().min(1),
    aliases: z.array(z.string().min(1)).default([]),
    specifications: z.array(SpecSchema).default([]),
    /** Link to the OEM's official manual/portal — a reference, not reproduced content. */
    manual: ManualLinkSchema.optional(),
    /** Regional supplier/distributor for this brand. */
    supplier: z.string().optional(),
    provider_type: z.string().optional(),
    sources: z.array(z.string().min(1)).min(1, "every model must cite at least one source"),
    last_reviewed: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "last_reviewed must be an ISO date (YYYY-MM-DD)"),
    license: z.literal("CC-BY-4.0").default("CC-BY-4.0"),
  })
  .strict();

export type Model = z.infer<typeof ModelSchema>;
