import type { LoadResult, LoadedAsset, LoadedModel } from "./data-loader.js";

/**
 * MCP Resources — expose each equipment category as a browsable resource (siyana://<region>/<id>)
 * so MCP clients can read the knowledge directly, not only via tool calls.
 */

/** Render a category as a self-contained Markdown document. */
export function renderAssetMarkdown(a: LoadedAsset, models: LoadedModel[]): string {
  const out: string[] = [`# ${a.asset_type} \`${a.id}\``, "", a.body, ""];

  if (a.specifications.length) {
    out.push("## Specifications");
    for (const s of a.specifications) out.push(`- **${s.key}:** ${s.value}`);
    out.push("");
  }
  if (a.ppm.length) {
    out.push("## PPM schedule");
    for (const t of a.ppm) {
      let line = `- **${t.frequency}** — ${t.task}`;
      if (t.note) line += ` _(${t.note})_`;
      if (t.standard_ref) line += ` — ${t.standard_ref}`;
      out.push(line);
    }
    out.push("");
  }
  if (a.common_faults.length) {
    out.push("## Common faults");
    for (const f of a.common_faults) {
      out.push(`### ${f.symptom}`);
      out.push(`- **Likely causes:** ${f.likely_causes.join("; ")}`);
      out.push(`- **Resolution:** ${f.resolution_steps.join(" → ")}`);
      if (f.safety_notes) out.push(`- **⚠ Safety:** ${f.safety_notes}`);
      out.push("");
    }
  }
  if (models.length) {
    out.push("## Brands & official manuals");
    for (const m of models) {
      let line = `- **${m.brand} ${m.model}**`;
      if (m.manual?.url) line += ` — [manual](${m.manual.url})${m.manual.access ? ` _(${m.manual.access})_` : ""}`;
      out.push(line);
    }
    out.push("");
  }
  out.push("---", `Region: \`${a.region}\` · Last reviewed: ${a.last_reviewed} · License: ${a.license}`);
  out.push(`Sources: ${a.sources.join(" · ")}`);
  return out.join("\n");
}

export interface AssetResource {
  uri: string;
  name: string;
  description: string;
  render: () => string;
}

/** Build one resource per loaded category. */
export function buildAssetResources(store: LoadResult): AssetResource[] {
  return store.assets.map((a) => ({
    uri: `siyana://${a.region}/${a.id}`,
    name: `${a.asset_type} (${a.region})`,
    description: `${a.trade} — specs, PPM, faults & manuals for ${a.asset_type}`,
    render: () => renderAssetMarkdown(a, store.modelsFor(a.region, a.id)),
  }));
}
