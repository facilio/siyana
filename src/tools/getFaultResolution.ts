import { z } from "zod";
import { errorResult, json, regionInput, resolveRegion, type ToolFactory } from "./types.js";

export const getFaultResolution: ToolFactory = (ctx) => ({
  name: "get_fault_resolution",
  description:
    "Diagnose and resolve a fault on an asset type, within the active region. Given an asset id and a free-text symptom (e.g. 'tripping on high pressure', 'low water flow'), returns the best-matching known faults with likely causes, step-by-step resolution, and safety notes, plus the region context. Omit `symptom` to list all known faults. Pass `region` to read a different region's dataset.",
  inputShape: {
    id: z.string().min(1).describe("Asset id, e.g. 'hvac-chiller-air-cooled'."),
    symptom: z
      .string()
      .optional()
      .describe("Free-text description of the fault/symptom. Omit to list all known faults."),
    region: regionInput,
  },
  handler: (args) => {
    const id = String(args.id ?? "");
    const region = resolveRegion(ctx, args);
    const asset = ctx.store.get(region, id);
    if (!asset) {
      return errorResult(
        `No asset with id "${id}" in region "${region}". Use search_assets or list_asset_categories (scoped to this region) to find valid ids.`,
      );
    }

    const symptom = (args.symptom as string | undefined)?.trim();
    let faults = asset.common_faults;
    if (symptom) {
      const terms = symptom.toLowerCase().split(/\s+/).filter(Boolean);
      const scored = asset.common_faults
        .map((f) => {
          const haystack = [f.symptom, ...f.likely_causes, ...f.resolution_steps]
            .join(" ")
            .toLowerCase();
          const score = terms.reduce((n, t) => n + (haystack.includes(t) ? 1 : 0), 0);
          return { f, score };
        })
        .filter((x) => x.score > 0)
        .sort((a, b) => b.score - a.score);
      // Fall back to the full list if nothing matched, so the caller still gets useful guidance.
      faults = scored.length > 0 ? scored.map((x) => x.f) : asset.common_faults;
    }

    return json({
      id: asset.id,
      region: asset.region,
      asset_type: asset.asset_type,
      symptom: symptom ?? null,
      matched: symptom ? faults.length : null,
      faults,
      sources: asset.sources,
      safety_reminder:
        "Always isolate power and follow lockout/tagout and local regulatory procedures before any intervention.",
    });
  },
});
