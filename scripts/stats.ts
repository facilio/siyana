import { loadAssets } from "../src/data-loader.js";
import { loadProviders } from "../src/providers.js";
import { TRADES } from "../src/schema.js";

/**
 * Print knowledge-base coverage — a quick pulse on how the community knowledge is growing.
 * Usage: npm run stats [-- --json]
 */
const asJson = process.argv.slice(2).includes("--json");
const store = loadAssets();
const { assets, availableRegions } = store;
const providers = loadProviders();
const providerCount = [...providers.values()].reduce((n, list) => n + list.length, 0);

const brands = new Set<string>();
let modelCount = 0;
for (const a of assets) {
  for (const m of store.modelsFor(a.region, a.id)) {
    brands.add(m.brand);
    modelCount++;
  }
}

const byRegion = availableRegions.map((region) => {
  const ra = assets.filter((a) => a.region === region);
  return {
    region,
    categories: ra.length,
    models: ra.reduce((n, a) => n + store.modelsFor(region, a.id).length, 0),
    trades: Object.fromEntries(TRADES.map((t) => [t, ra.filter((a) => a.trade === t).length])),
  };
});

const summary = {
  total_categories: assets.length,
  total_models: modelCount,
  regions: availableRegions,
  distinct_brands: brands.size,
  ppm_tasks: assets.reduce((n, a) => n + a.ppm.length, 0),
  documented_faults: assets.reduce((n, a) => n + a.common_faults.length, 0),
  directory_providers: providerCount,
  by_region: byRegion,
};

if (asJson) {
  process.stdout.write(JSON.stringify(summary, null, 2) + "\n");
} else {
  process.stdout.write(`Siyana knowledge base\n`);
  process.stdout.write(`  ${summary.total_categories} equipment categories · ${summary.total_models} models · ${summary.distinct_brands} brands\n`);
  process.stdout.write(`  ${summary.ppm_tasks} PPM tasks · ${summary.documented_faults} faults\n`);
  process.stdout.write(`  ${summary.directory_providers} suppliers/providers in the directory\n`);
  process.stdout.write(`  regions: ${availableRegions.join(", ")}\n`);
  for (const r of byRegion) {
    const trades = TRADES.map((t) => `${t} ${r.trades[t]}`).join(", ");
    process.stdout.write(`  - ${r.region}: ${r.categories} categories, ${r.models} models (${trades})\n`);
  }
  process.stdout.write(`\nSomething missing? Open an issue: equipment, brand, trade/service, or region.\n`);
}
