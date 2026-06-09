import { z } from "zod";
import { errorResult, json, regionInput, resolveRegion, type ToolFactory } from "./types.js";

export const getPpmSchedule: ToolFactory = (ctx) => ({
  name: "get_ppm_schedule",
  description:
    "Get the recommended preventive/planned maintenance (PPM) schedule for an asset type by id, within the active region: tasks, frequencies, region-specific notes (climate/regulatory adjustments such as high heat, dust, hard water, local norms), and the standard each frequency is based on (e.g. CIBSE Guide M, SFG20-style). Pass `region` to read a different region's dataset.",
  inputShape: {
    id: z.string().min(1).describe("Asset id, e.g. 'hvac-chiller-air-cooled'."),
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
    return json({
      id: asset.id,
      region: asset.region,
      asset_type: asset.asset_type,
      ppm: asset.ppm.map((task) => ({
        task: task.task,
        frequency: task.frequency,
        note: task.note ?? null,
        standard_ref: task.standard_ref ?? null,
      })),
      sources: asset.sources,
      last_reviewed: asset.last_reviewed,
      note: "Frequencies are region-tuned guidance synthesised from public standards — always cross-check against the OEM manual and local regulations.",
    });
  },
});
