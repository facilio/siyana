import { loadAssets, listMarkdownFiles, DATA_DIR } from "../src/data-loader.js";
import { loadBenchmarks } from "../src/benchmarks.js";
import { loadProviders } from "../src/providers.js";

/**
 * CI gate: every equipment file must parse, validate against the frontmatter schema, and have a
 * unique id per region; benchmark and provider files must validate too. Exits non-zero on any error.
 */
try {
  const files = listMarkdownFiles(DATA_DIR);
  const { assets, availableRegions } = loadAssets();
  const benchmarks = loadBenchmarks();
  const providers = loadProviders();
  const providerCount = [...providers.values()].reduce((n, list) => n + list.length, 0);
  process.stdout.write(
    `✓ ${assets.length} asset(s) across ${files.length} file(s) in region(s): ${availableRegions.join(", ")}.\n`,
  );
  process.stdout.write(`✓ ${benchmarks.size} region benchmark file(s) valid.\n`);
  process.stdout.write(`✓ ${providerCount} provider(s) across ${providers.size} region file(s) valid.\n`);
} catch (err) {
  process.stderr.write(`✗ Validation failed:\n\n${(err as Error).message}\n`);
  process.exit(1);
}
