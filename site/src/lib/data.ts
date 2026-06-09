import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, resolve, sep } from "node:path";
import { parse } from "yaml";

// The site lives in <repo>/site; data + benchmarks live one level up. Read them at BUILD time
// (Node) with `yaml` only — we deliberately avoid importing the package's runtime graph (minisearch/
// zod) here. The calculator's *math* still imports the package's pure functions (see index.astro).
const repoRoot = resolve(process.cwd(), "..");
const DATA_DIR = join(repoRoot, "data");
const BENCH_DIR = join(repoRoot, "reference", "benchmarks");

function walk(dir: string, re: RegExp): string[] {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  for (const e of readdirSync(dir)) {
    const full = join(dir, e);
    if (statSync(full).isDirectory()) out.push(...walk(full, re));
    else if (re.test(e)) out.push(full);
  }
  return out;
}

/** Parse YAML frontmatter from a Markdown file. */
function frontmatter(raw: string): Record<string, any> {
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw);
  return m ? ((parse(m[1]) as Record<string, any>) ?? {}) : {};
}

export interface Stats {
  categories: number;
  models: number;
  brands: number;
  ppmTasks: number;
  faults: number;
  trades: { hvac: number; electrical: number; plumbing: number };
  regions: string[];
}

export function getStats(): Stats {
  const files = walk(DATA_DIR, /\.md$/i).filter((f) => f.includes(`${sep}equipments${sep}`));
  const brands = new Set<string>();
  const trades = { hvac: 0, electrical: 0, plumbing: 0 };
  let categories = 0;
  let models = 0;
  let ppmTasks = 0;
  let faults = 0;
  for (const f of files) {
    const doc = frontmatter(readFileSync(f, "utf8"));
    if (f.endsWith(`${sep}category.md`)) {
      categories++;
      if (doc?.trade in trades) (trades as any)[doc.trade]++;
      ppmTasks += (doc?.ppm ?? []).length;
      faults += (doc?.common_faults ?? []).length;
    } else {
      models++;
      if (doc?.brand) brands.add(doc.brand);
    }
  }
  return { categories, models, brands: brands.size, ppmTasks, faults, trades, regions: ["gcc"] };
}

/** Distinct brand names present in the equipment knowledge (for the "what's inside" showcase). */
export function getBrands(): string[] {
  const files = walk(DATA_DIR, /\.md$/i).filter(
    (f) => f.includes(`${sep}equipments${sep}`) && !f.endsWith(`${sep}category.md`),
  );
  const brands = new Set<string>();
  for (const f of files) {
    const doc = frontmatter(readFileSync(f, "utf8"));
    if (doc?.brand) brands.add(String(doc.brand));
  }
  return [...brands].sort((a, b) => a.localeCompare(b));
}

export interface GccBenchmark {
  cdd_base_c: number;
  reference_annual_cdd: number;
  building_types: Record<
    string,
    { cooling_eui_kwh_m2_yr: { typical: number; low?: number; high?: number }; cooling_load_w_per_m2?: number; note?: string }
  >;
  sources: string[];
}

export function getGccBenchmark(): GccBenchmark {
  return parse(readFileSync(join(BENCH_DIR, "gcc.yaml"), "utf8")) as GccBenchmark;
}
