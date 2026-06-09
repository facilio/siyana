import MiniSearch from "minisearch";
import type { Asset, Model } from "./schema.js";

interface RegionAsset extends Asset {
  region: string;
  body: string;
}
interface RegionModel extends Model {
  region: string;
  body: string;
}

/**
 * In-memory fuzzy search over equipment categories — asset type, aliases, description, fault
 * symptoms, and the brands/models that exist under each category. Always region-scoped.
 */
export class AssetSearch {
  private mini: MiniSearch;
  private byKey: Map<string, RegionAsset>;

  constructor(assets: RegionAsset[], models: Map<string, RegionModel[]>) {
    this.byKey = new Map(assets.map((a) => [`${a.region}/${a.id}`, a]));
    this.mini = new MiniSearch({
      idField: "key",
      fields: ["asset_type", "aliases", "brands", "faults", "body"],
      storeFields: ["asset_type", "trade", "region", "assetId"],
      searchOptions: { boost: { asset_type: 3, aliases: 2, brands: 2 }, prefix: true, fuzzy: 0.2 },
    });

    this.mini.addAll(
      assets.map((a) => {
        const ms = models.get(`${a.region}/${a.id}`) ?? [];
        return {
          key: `${a.region}/${a.id}`,
          assetId: a.id,
          asset_type: a.asset_type,
          trade: a.trade,
          region: a.region,
          aliases: a.aliases.join(" "),
          brands: ms.map((m) => `${m.brand} ${m.model}`).join(" "),
          faults: a.common_faults.map((f) => f.symptom).join(" "),
          body: a.body,
        };
      }),
    );
  }

  /** Return matching categories within `region` (best first), optionally filtered by trade. */
  query(text: string, opts: { region: string; trade?: string; limit?: number }): RegionAsset[] {
    const { region, trade, limit = 10 } = opts;
    const results = this.mini.search(text, {
      filter: (r) => r.region === region && (!trade || r.trade === trade),
    });
    const out: RegionAsset[] = [];
    for (const r of results) {
      const a = this.byKey.get(r.id as string);
      if (a) out.push(a);
      if (out.length >= limit) break;
    }
    return out;
  }
}

export function buildSearchIndex(
  assets: RegionAsset[],
  models: Map<string, RegionModel[]>,
): AssetSearch {
  return new AssetSearch(assets, models);
}
