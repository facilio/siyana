import { loadAssets } from "../src/data-loader.js";

/**
 * Report assets whose last_reviewed date is older than the staleness threshold.
 * Keeps the "stays up to date" promise honest. Used by a scheduled CI job to open review issues.
 *
 * Usage: npm run freshness [-- --days=365] [--json]
 */
const args = process.argv.slice(2);
const daysArg = args.find((a) => a.startsWith("--days="));
const thresholdDays = daysArg ? Number(daysArg.split("=")[1]) : 365;
const asJson = args.includes("--json");

const { assets } = loadAssets();
const now = Date.now();
const msPerDay = 24 * 60 * 60 * 1000;

const aged = assets
  .map((a) => {
    const ageDays = Math.floor((now - Date.parse(a.last_reviewed)) / msPerDay);
    return { id: a.id, asset_type: a.asset_type, last_reviewed: a.last_reviewed, ageDays };
  })
  .sort((a, b) => b.ageDays - a.ageDays);

const stale = aged.filter((a) => a.ageDays > thresholdDays);

if (asJson) {
  process.stdout.write(JSON.stringify({ thresholdDays, stale }, null, 2) + "\n");
} else {
  process.stdout.write(`Freshness report (threshold: ${thresholdDays} days)\n`);
  if (stale.length === 0) {
    process.stdout.write(`✓ All ${assets.length} assets reviewed within ${thresholdDays} days.\n`);
  } else {
    process.stdout.write(`⚠ ${stale.length} stale asset(s):\n`);
    for (const a of stale) {
      process.stdout.write(`  - ${a.id} (${a.asset_type}) — reviewed ${a.last_reviewed}, ${a.ageDays}d ago\n`);
    }
  }
}
