import { TRADES } from "../schema.js";
import { json, regionInput, resolveRegion, type ToolFactory } from "./types.js";

export const listAssetCategories: ToolFactory = (ctx) => ({
  name: "list_asset_categories",
  description:
    "Discover what the knowledge base covers for the active region. Returns the trades (HVAC, electrical, plumbing) and, for each, the asset types available with their ids — plus the region scopes available and the server's default. Call this first to see what you can ask about. Pass `region` to inspect another region's dataset.",
  inputShape: { region: regionInput },
  handler: (args) => {
    const region = resolveRegion(ctx, args);
    const regionAssets = ctx.store.inRegion(region);
    const trades = TRADES.map((trade) => {
      const assets = regionAssets
        .filter((a) => a.trade === trade)
        .map((a) => ({
          id: a.id,
          asset_type: a.asset_type,
          aliases: a.aliases,
          model_count: ctx.store.modelsFor(region, a.id).length,
        }));
      return { trade, count: assets.length, assets };
    });
    return json({
      region,
      total_assets: regionAssets.length,
      regions: { default: ctx.defaultRegion, available: ctx.availableRegions },
      trades,
    });
  },
});
