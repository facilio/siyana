import { z } from "zod";
import { TradeSchema } from "../schema.js";
import { json, regionInput, resolveRegion, type ToolFactory } from "./types.js";

export const searchAssets: ToolFactory = (ctx) => ({
  name: "search_assets",
  description:
    "Fuzzy-search the active region's knowledge base by free text — keyword, asset type, brand, or model (e.g. 'Daikin VRV', 'chiller', 'booster pump'). Optionally filter by trade. Returns matching asset ids to use with get_asset_spec, get_ppm_schedule, or get_fault_resolution. Pass `region` to search a different region's dataset.",
  inputShape: {
    query: z.string().min(1).describe("Free-text search: keyword, asset type, brand, or model."),
    trade: TradeSchema.optional().describe("Optional filter: hvac | electrical | plumbing."),
    limit: z.number().int().min(1).max(50).optional().describe("Max results (default 10)."),
    region: regionInput,
  },
  handler: (args) => {
    const query = String(args.query ?? "");
    const trade = args.trade as string | undefined;
    const limit = typeof args.limit === "number" ? args.limit : 10;
    const region = resolveRegion(ctx, args);
    const matches = ctx.store.search.query(query, { region, trade, limit }).map((a) => ({
      id: a.id,
      trade: a.trade,
      asset_type: a.asset_type,
      aliases: a.aliases,
      brands: ctx.store.modelsFor(region, a.id).map((m) => `${m.brand} ${m.model}`),
    }));
    return json({ query, region, trade: trade ?? null, count: matches.length, matches });
  },
});
