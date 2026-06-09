import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, relative, sep, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { AssetSchema, ModelSchema, type Asset, type Model, TRADES, REGIONS, type Region } from "./schema.js";
import { parseFrontmatter } from "./markdown.js";
import { buildSearchIndex, type AssetSearch } from "./search.js";

/** Absolute path to the bundled `data/` directory (sibling of src/ and dist/). */
export const DATA_DIR = fileURLToPath(new URL("../data", import.meta.url));

/** A category (generic equipment knowledge): structured frontmatter + Markdown `body`. */
export interface LoadedAsset extends Asset {
  region: Region;
  /** Markdown narrative — description, region context, guidance. */
  body: string;
}
/** A brand/model under a category. */
export interface LoadedModel extends Model {
  region: Region;
  body: string;
}

export interface LoadResult {
  assets: LoadedAsset[];
  get(region: string, id: string): LoadedAsset | undefined;
  inRegion(region: string): LoadedAsset[];
  modelsFor(region: string, id: string): LoadedModel[];
  search: AssetSearch;
  availableRegions: string[];
}

export interface LoadError {
  file: string;
  message: string;
}

const isRegion = (s: string): s is Region => (REGIONS as readonly string[]).includes(s);

/**
 * Load and validate the equipments pillar: data/<region>/equipments/<category>/category.md (generic
 * knowledge) and .../<category>/<brand>/<model>.md (model-specific). Each file is Markdown with YAML
 * frontmatter (structured fields) and a Markdown body (narrative). Throws an aggregated error.
 */
export function loadAssets(dataDir: string = DATA_DIR): LoadResult {
  const assets: LoadedAsset[] = [];
  const byKey = new Map<string, LoadedAsset>();
  const models = new Map<string, LoadedModel[]>(); // key: `${region}/${category_id}`
  const errors: LoadError[] = [];

  for (const file of listMarkdownFiles(dataDir)) {
    const parts = relative(dataDir, file).split(sep);
    const region = parts[0];
    if (!isRegion(region)) {
      errors.push({ file, message: `file is not under a known region folder (got "${region}"); expected data/<${REGIONS.join("|")}>/...` });
      continue;
    }
    if (parts[1] !== "equipments") continue;

    const { data, body } = parseFrontmatter(readFileSync(file, "utf8"));

    if (basename(file) === "category.md") {
      const parsed = AssetSchema.safeParse(data);
      if (!parsed.success) {
        errors.push({ file, message: issues(parsed.error) });
        continue;
      }
      if (!body) {
        errors.push({ file, message: "category.md must have a Markdown body (description / context)" });
        continue;
      }
      const asset: LoadedAsset = { ...parsed.data, region, body };
      const key = `${region}/${asset.id}`;
      if (byKey.has(key)) {
        errors.push({ file, message: `duplicate category id "${asset.id}" in region "${region}"` });
        continue;
      }
      byKey.set(key, asset);
      assets.push(asset);
    } else {
      const parsed = ModelSchema.safeParse(data);
      if (!parsed.success) {
        errors.push({ file, message: issues(parsed.error) });
        continue;
      }
      const m: LoadedModel = { ...parsed.data, region, body };
      const key = `${region}/${m.category_id}`;
      (models.get(key) ?? models.set(key, []).get(key)!).push(m);
    }
  }

  for (const key of models.keys()) {
    if (!byKey.has(key)) errors.push({ file: key, message: `models reference unknown category "${key}"` });
  }

  if (errors.length > 0) {
    const detail = errors.map((e) => `${e.file}\n${e.message}`).join("\n\n");
    throw new Error(`Failed to load ${errors.length} equipment file(s):\n\n${detail}`);
  }

  const availableRegions = REGIONS.filter((r) => assets.some((a) => a.region === r));

  return {
    assets,
    get: (region, id) => byKey.get(`${region}/${id}`),
    inRegion: (region) => assets.filter((a) => a.region === region),
    modelsFor: (region, id) => models.get(`${region}/${id}`) ?? [],
    search: buildSearchIndex(assets, models),
    availableRegions,
  };
}

function issues(error: { issues: { path: (string | number)[]; message: string }[] }): string {
  return (
    "frontmatter validation failed:\n" +
    error.issues.map((i) => `  - ${i.path.join(".") || "(root)"}: ${i.message}`).join("\n")
  );
}

/** Recursively collect *.md files under the data directory. */
export function listMarkdownFiles(dataDir: string): string[] {
  const out: string[] = [];
  if (!existsSync(dataDir)) return out;
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) walk(full);
      else if (/\.md$/i.test(entry)) out.push(full);
    }
  };
  walk(dataDir);
  return out.sort();
}

export { TRADES };
