import { loadAssets } from "../src/data-loader.js";

/**
 * Content-quality gate (beyond schema validation). Protects trust as contributions scale:
 * completeness, safety notes on hazardous faults, citations, and freshness.
 * Exits non-zero on ERRORS; WARNINGS are advisory.
 */
const HAZARD =
  /(refrigerant|high[- ]?pressure|discharge pressure|pressure vessel|confined space|\bgas\b|high[- ]?voltage|\blive\b|arc[- ]?flash|lockout|electrocut)/i;
const STALE_DAYS = 365;

const store = loadAssets();
const errors: string[] = [];
const warnings: string[] = [];
const now = Date.now();

for (const a of store.assets) {
  const id = `${a.region}/${a.id}`;

  // completeness
  if (a.ppm.length === 0) errors.push(`${id}: no PPM tasks`);
  if (a.common_faults.length === 0) errors.push(`${id}: no common_faults`);
  if (!a.body || a.body.trim().length < 40) errors.push(`${id}: Markdown body too short (needs a real description)`);
  if (a.specifications.length < 2) warnings.push(`${id}: only ${a.specifications.length} specification(s)`);

  // freshness
  const reviewed = Date.parse(a.last_reviewed);
  if (Number.isNaN(reviewed)) errors.push(`${id}: invalid last_reviewed`);
  else if (reviewed > now) errors.push(`${id}: last_reviewed is in the future`);
  else if ((now - reviewed) / 86_400_000 > STALE_DAYS) warnings.push(`${id}: last_reviewed is over ${STALE_DAYS} days old`);

  // ppm citations/context
  for (const t of a.ppm) {
    if (!t.note && !t.standard_ref) warnings.push(`${id}: PPM "${t.task}" has neither a note nor standard_ref`);
  }

  // safety on hazardous faults
  for (const f of a.common_faults) {
    const text = `${f.symptom} ${f.likely_causes.join(" ")} ${f.resolution_steps.join(" ")}`;
    if (HAZARD.test(text) && !f.safety_notes) {
      errors.push(`${id}: hazardous fault "${f.symptom}" must include safety_notes`);
    }
  }

  // models: must cite a source
  for (const m of store.modelsFor(a.region, a.id)) {
    if (m.sources.length === 0) errors.push(`${id} → ${m.brand} ${m.model}: model has no sources`);
  }
}

if (warnings.length) {
  process.stdout.write(`⚠ ${warnings.length} warning(s):\n` + warnings.map((w) => `  - ${w}`).join("\n") + "\n\n");
}
if (errors.length) {
  process.stderr.write(`✗ ${errors.length} content error(s):\n` + errors.map((e) => `  - ${e}`).join("\n") + "\n");
  process.exit(1);
}
process.stdout.write(`✓ Content quality OK — ${store.assets.length} categories pass completeness, safety & freshness checks.\n`);
