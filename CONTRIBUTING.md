# Contributing to Siyana

Thank you for helping keep facilities-management knowledge accurate and open! Siyana is a **community-grown** knowledge base — most contributions are **new or updated knowledge files** and need no code at all.

## Ways to help (from least to most effort)

1. **Request what's missing** — no coding, one click. Use an issue form: [new asset](../../issues/new?template=01-new-asset.yml), [add a brand](../../issues/new?template=02-add-brand.yml) (e.g. *"Add Trane HVAC equipment"*), [new trade/service](../../issues/new?template=03-new-trade-or-service.yml), [new region](../../issues/new?template=04-new-region.yml), or [report a problem](../../issues/new?template=05-data-correction.yml).
2. **Fill a request** — pick up an open `new-asset` / `add-brand` issue (look for `good first issue`) and open a PR with the YAML.
3. **Add or correct knowledge directly** — see [Adding or updating an asset](#adding-or-updating-an-asset) below.
4. **Improve the engine** — code changes to tools, loader, or schema are welcome too.

Contributors are credited under the data's CC BY 4.0 attribution ("Siyana contributors"). Thank you — every entry compounds.

## ⚖️ The one hard rule: no copyrighted text

This project is legally safe because it **paraphrases public information and cites it** — it never reproduces copyrighted material.

- ❌ **Do not** paste text, tables, or images from OEM manuals, datasheets behind logins, paid standards (ASHRAE/CIBSE/SFG20/IEC documents), or other copyrighted sources.
- ✅ **Do** write the guidance in your own words, based on public information and field experience.
- ✅ **Do** cite the public source you relied on in the `sources` list (a public manufacturer page, a standard *by name/clause*, a regulator's public guidance).
- ✅ Reference standards by name and clause (e.g. "CIBSE Guide M frequency basis") — never copy their text.

Every asset file **must** include at least one entry in `sources`. CI enforces this.

### From a manufacturer manual to Siyana knowledge

OEM manuals are the richest source of accurate specs, PPM intervals and fault steps — and the right way to use them keeps Siyana legal:

1. **Read the manual at its official source** (we keep links per brand in each asset's `brands[].source` and in the provider directory, `reference/providers/`).
2. **Write the guidance in your own words** into the schema — distil the spec/PPM/fault into an original, concise entry. Do **not** paste manual text, tables, or images.
3. **Cite the manual URL** in `sources` (and on the brand entry). The manual is your *source*, not your *content*.

The manual PDFs themselves are never downloaded into or shipped with this repo — only original, cited guidance. This is how brand-specific depth grows safely over time.

## Adding or updating an asset

1. Equipment lives under `data/<region>/equipments/<category>/` as **Markdown files** — YAML frontmatter for the structured fields (specs, PPM, faults, manual link) and a Markdown body for the narrative (description, region context, guidance). Add generic, brand-agnostic knowledge in `category.md`, and brand/model specifics in `<brand>/<model>.md`. Today `gcc` is the only populated region (region must be one of `gcc`, `uk`, `us`, `anz`, `eu`). The frontmatter validates against `schema/category.schema.json` and `schema/model.schema.json`.
2. Copy an existing file as a template, or follow the schema in [`schema/asset.schema.json`](schema/asset.schema.json) (generated from [`src/schema.ts`](src/schema.ts)).
3. Use a unique, kebab-case `id` prefixed by trade, e.g. `hvac-cooling-tower`.
4. Fill in `specifications`, `ppm`, and `common_faults`. The file is already region-specific (it lives under `data/<region>/`), so write the guidance for that region:
   - On a PPM task: `note: "…"` — the region-specific adjustment (e.g. for GCC: heat, dust, hard water, local norms).
   - On the asset: `context: "…"` — a summary of how the asset behaves under that region's conditions.
5. Set `last_reviewed` to today's date (`YYYY-MM-DD`) and list your `sources`.
6. Validate locally:

   ```bash
   npm install
   npm run validate
   npm test
   ```

7. Open a pull request. CI will validate the data, typecheck, and run tests; a maintainer will review for accuracy and IP compliance.

### YAML tips

- Quote any value that contains a comma, colon, or `#` — e.g. `value: "400/230 V, 50 Hz"`.
- Keep guidance practical and field-oriented; include `safety_notes` for any fault involving electrical, refrigerant, confined-space, or pressure hazards.

## Requesting something (no data needed)

Don't have the details but want something covered? Open the matching [issue form](../../issues/new/choose) — new asset, brand, trade/service, region, or a correction — and the community can pick it up. Maintainers tag tractable ones `good first issue`.

## Keeping data fresh

When a manufacturer launches a new model or a practice changes, update the relevant file and bump `last_reviewed`. Run `npm run freshness` to see which entries are overdue for review.

## Code contributions

Code changes (tools, loader, schema) are welcome too. Run `npm run typecheck && npm test` before opening a PR, and keep changes consistent with the existing style.

## Releasing (maintainers)

Publishing is automated. Pushing a `vX.Y.Z` tag triggers `.github/workflows/release.yml`, which runs `npm ci` (the `prepare` script builds `dist/`), validates the data, runs tests, and `npm publish`es to npm.

```bash
npm version patch        # bumps package.json and creates the git tag
git push --follow-tags   # pushes the commit + tag → CI publishes
```

Requirements:
- Repo secret **`NPM_TOKEN`** — an npm granular/automation token with publish rights and "bypass 2FA".
- The repo is **public**, which enables npm **provenance** (`--provenance` + `id-token` permission). If a fork is private, drop `--provenance` from the workflow.

## Code of conduct

By participating you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## Licensing of contributions

By contributing, you agree that your **code** is licensed under Apache-2.0 and your **data** contributions under CC BY 4.0, consistent with this repository.
