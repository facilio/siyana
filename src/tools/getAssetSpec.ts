import { z } from "zod";
import { errorResult, json, regionInput, resolveRegion, type ToolFactory } from "./types.js";

export const getAssetSpec: ToolFactory = (ctx) => ({
  name: "get_asset_spec",
  description:
    "Get the full specification for an equipment category by id (from search_assets or list_asset_categories), within the active region. Returns the generic category spec + region context, and the brands/models available under it — each with model-specific specs and a link to the OEM's official manual. Pass `brand` and/or `model` to narrow, and `region` to read a different region's dataset.",
  inputShape: {
    id: z.string().min(1).describe("Equipment category id, e.g. 'hvac-vrf-system'."),
    brand: z.string().optional().describe("Optional: filter models to this brand."),
    model: z.string().optional().describe("Optional: filter models to this model."),
    region: regionInput,
  },
  handler: (args) => {
    const id = String(args.id ?? "");
    const region = resolveRegion(ctx, args);
    const asset = ctx.store.get(region, id);
    if (!asset) {
      return errorResult(
        `No equipment category "${id}" in region "${region}". Use search_assets or list_asset_categories (scoped to this region) to find valid ids.`,
      );
    }

    const brand = (args.brand as string | undefined)?.toLowerCase();
    const model = (args.model as string | undefined)?.toLowerCase();
    const models = ctx.store
      .modelsFor(region, id)
      .filter(
        (m) =>
          (!brand || m.brand.toLowerCase().includes(brand)) &&
          (!model || m.model.toLowerCase().includes(model)),
      )
      .map((m) => ({
        brand: m.brand,
        model: m.model,
        specifications: m.specifications,
        manual: m.manual ?? null,
        supplier: m.supplier ?? null,
        notes: m.body || null,
        sources: m.sources,
      }));

    return json({
      id: asset.id,
      region: asset.region,
      trade: asset.trade,
      asset_type: asset.asset_type,
      aliases: asset.aliases,
      description: asset.body,
      specifications: asset.specifications,
      models,
      sources: asset.sources,
      last_reviewed: asset.last_reviewed,
      license: asset.license,
    });
  },
});
