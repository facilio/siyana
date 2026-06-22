# Siyana

> **صِيانة** — Arabic for *"maintenance."*

**Open-source [Model Context Protocol](https://modelcontextprotocol.io) server delivering region-tuned facilities-management asset knowledge — specs, fault resolution, and PPM schedules — directly inside any LLM client. Launching GCC-first.**

Facilities teams in the Gulf answer the same questions every day: *What are the specs for this asset? How do I resolve this fault? What's the right preventive-maintenance schedule for it in this climate?* This server puts that knowledge — tuned for the Middle East's heat, dust, and hard water — one question away in Claude, Cursor, or any MCP-compatible client.

> ⚠️ **Guidance, not gospel.** The knowledge base is synthesised from public manufacturer information and open standards, then GCC-tuned. It is *not* a substitute for the OEM manual, a competent engineer's judgement, or local regulations. Always verify before acting.

---

## 🌱 A living, community-grown knowledge base

Siyana is an **open ecosystem** — the knowledge base grows with the FM community, not just one vendor. Anything missing? **Request it in one click**, no coding required:

| If you want to… | Open this issue |
|------|------|
| Add equipment we don't cover (e.g. a fire pump) | [🧰 New asset / equipment](../../issues/new?template=01-new-asset.yml) |
| Add a brand to assets we have (e.g. *"Add Trane HVAC equipment"*) | [🏷️ Add a brand / manufacturer](../../issues/new?template=02-add-brand.yml) |
| Propose a new trade or service (fire, BMS, lifts, cleaning…) | [🧱 New trade / service](../../issues/new?template=03-new-trade-or-service.yml) |
| Start a new region (UK, US, ANZ, EU…) | [🌍 New region dataset](../../issues/new?template=04-new-region.yml) |
| Flag something wrong or outdated | [🩹 Report inaccurate data](../../issues/new?template=05-data-correction.yml) |

Prefer to contribute the knowledge directly? Even better — see [CONTRIBUTING.md](CONTRIBUTING.md). Every entry is paraphrased and cited (never copyrighted text), reviewed by a maintainer, and shipped in the next release. Run `npm run stats` to see current coverage.

---

## What it covers (v1)

Four trades, 30+ asset categories, each with **specifications**, **GCC-tuned PPM schedules**, **fault-resolution guides**, and **cited sources**:

| Trade | Assets |
|-------|--------|
| **HVAC** | Air-/water-cooled chiller, AHU, FAHU, VRF/VRV, split AC, RTU, condensing unit, cooling tower, FCU, VAV, chilled beam, ERV, precision/CRAC cooling, dehumidifier, humidifier, air curtain, kitchen exhaust, fire/smoke damper |
| **Electrical** | LV distribution board, diesel generator, UPS, distribution transformer, ACB/LV switchgear |
| **Plumbing** | Booster pump set, submersible drainage/sewage pump, electric water heater, GRP water tank |
| **Fire & life-safety** | Fire pump, sprinkler system, fire-alarm panel, smoke control/ventilation |

> **Not yet included:** market/labour rates, services & resources pillars (planned). See [Roadmap](#roadmap).

## Tools

| Tool | What it does |
|------|--------------|
| `list_asset_categories` | List the trades and every available asset type with its id. **Start here.** |
| `search_assets` | Fuzzy-search by keyword, asset type, brand, or model (e.g. `"Daikin VRV"`). |
| `get_asset_spec` | Full specs for an asset type, plus cited brand/model spec sheets and region context. |
| `get_ppm_schedule` | Region-tuned preventive-maintenance tasks, frequencies, and the standard behind each. |
| `get_fault_resolution` | Diagnose a symptom → likely causes, step-by-step resolution, safety notes. |

**Live weather-aware tools** (need network; disable with `SIYANA_OFFLINE=1`):

| Tool | What it does |
|------|--------------|
| `get_weather` | Current conditions + daily forecast + elevated dust/PM10 for a location. |
| `estimate_cooling_energy` | Indicative cooling kWh (and optional cost / peak TR) for a space, using live degree-days × a cited region/building-type benchmark. |
| `get_maintenance_advisory` | Turns the forecast into proactive maintenance actions (heatwave → coil clean, dust → filters), optionally tied to a specific asset's PPM tasks. |

**Also exposed over MCP:**
- **Resources** — each category is browsable at `siyana://<region>/<id>` (e.g. `siyana://gcc/hvac-ahu`), rendered as Markdown (specs · PPM · faults · manuals).
- **Prompts** — `ppm-plan`, `fault-triage`, `spec-lookup` — ready-made templates that orient an assistant (or a CMMS agent) to use the tools well.

---

## Quick start

Requires **Node.js ≥ 18**. The server runs over stdio and needs no configuration or network access.

```bash
npx siyana
```

### Claude Desktop / Claude Code

Add to your MCP config (`claude_desktop_config.json`, or `.mcp.json` for Claude Code):

```json
{
  "mcpServers": {
    "siyana": {
      "command": "npx",
      "args": ["-y", "siyana"]
    }
  }
}
```

### Cursor

In `~/.cursor/mcp.json` (or project `.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "siyana": {
      "command": "npx",
      "args": ["-y", "siyana"]
    }
  }
}
```

Then ask, for example:

- *"What's the PPM schedule for a Daikin VRV running in Dubai?"*
- *"My air-cooled chiller keeps tripping on high pressure in summer — how do I resolve it?"*
- *"How often should I clean a GRP water tank in the UAE, and why?"*

---

## Why GCC-tuned?

Generic global maintenance data under-serves the Gulf. This knowledge base bakes in:

- **Extreme heat** — high-ambient derating, more frequent condenser-coil cleaning, battery-life impacts.
- **Dust & sand** — shorter filter life, radiator/coil fouling, sand-trap louvres.
- **Hard water** — scaling of heaters, cooling-tower fill, and pump seals; descaling regimes.
- **Local norms** — references to DEWA, SASO, Dubai Municipality, and Civil Defence requirements.

---

## Regions & scope

Siyana ships **one dataset per region**, and the server is **scoped to a region** as an environment property. Each region is a self-contained dataset — a GCC chiller and a UK chiller are different files with their own specs, PPM, and faults. Tools only ever read from the active region's dataset.

```
data/
  gcc/                          ← region = dataset (the only one populated today)
    equipments/<category>/
      category.md               ← frontmatter (specs · PPM · faults) + Markdown body (guidance)
      <brand>/<model>.md        ← model specs + link to the OEM's official manual
    services/    resources/    benchmarks/   ← further pillars (rolling out)
  uk/  us/  anz/  eu/           ← add a region by adding a folder; no rebrand
```

Siyana's knowledge is organised into four region-scoped pillars: **equipments** (`category → brand → model`, live today), **services** (trades like housekeeping/glass-cleaning), **resources** (FM roles + indicative rates), and **benchmarks** (by facility type).

- **Scope with `SIYANA_REGION`** (`gcc` | `uk` | `us` | `anz` | `eu`); defaults to `gcc`. The server reads from `data/<region>/` and every tool is confined to it.
- **Override per call:** each tool also accepts an optional `region` argument to read another region's dataset.
- `list_asset_categories` reports the active region, the default, and which regions have data today.
- Asking for a region with no dataset returns a clear "no asset … in region" message — never silent or wrong.

```jsonc
// Scope a server instance to the UK dataset
{
  "mcpServers": {
    "siyana-uk": {
      "command": "npx",
      "args": ["-y", "siyana"],
      "env": { "SIYANA_REGION": "uk" }
    }
  }
}
```

> Today only the **`gcc`** dataset is populated. See the [roadmap](#roadmap).

## Weather-aware intelligence

Static guidance becomes *situational* when it knows the local weather. Siyana integrates the free, open, no-key [Open-Meteo](https://open-meteo.com) API so it can:

- **Estimate cooling energy** for a space from **live climate data** — e.g. *"how much energy will my 10,000 sqft Dubai office need this summer?"* It pulls cooling-degree-days for the location and applies a cited region/building-type energy-intensity benchmark.
- **Plan maintenance around the forecast** — a 48 °C heatwave next week → prioritise condenser-coil cleaning; a dust event → bring filter changes forward.

```text
estimate_cooling_energy({ location: "Dubai", area_sqft: 10000, building_type: "office", period: "summer" })
→ ~74,000 kWh (range 55k–98k) · summer CDD 2,186 · indicative ±~25%, with assumptions + sources
```

> **Indicative, not an MEP load calculation.** Estimates use the degree-day × benchmark method with wide error bars. The benchmarks in [`reference/benchmarks/`](reference/benchmarks/) are community-maintained — improve them via PRs.

**Design:** the five knowledge tools are fully **offline and deterministic** — only the three weather tools use the network, with timeouts, caching, and graceful failure. Run **`SIYANA_OFFLINE=1`** to disable the weather layer entirely (e.g. air-gapped sites); the knowledge tools keep working. Weather data © [Open-Meteo.com](https://open-meteo.com) (CC BY 4.0).

## How the knowledge stays up to date

- Every asset file carries `sources` and a `last_reviewed` date.
- New brand/model or revised practice → open a pull request → CI validates → maintainer review → release. `npx` users get it on the next run.
- `npm run freshness` reports entries overdue for review; a scheduled CI job opens "review needed" issues.

**Found an asset we're missing, or something out of date?** Open an issue or PR — see [CONTRIBUTING.md](CONTRIBUTING.md).

---

## Development

```bash
npm install
npm run dev        # run the server from source (tsx)
npm test           # run the test suite
npm run validate   # validate every data file against the schema
npm run gen-schema # regenerate schema/asset.schema.json from src/schema.ts
npm run build      # compile to dist/
npm run inspect    # build + open the MCP Inspector against the server
```

The data shape is defined once in [`src/schema.ts`](src/schema.ts) (zod) and mirrored to
[`schema/asset.schema.json`](schema/asset.schema.json) for contributors and CI.

---

## Roadmap

- **v2 — market & labour rates:** SQFT- and trade-wise FM staff/service rate benchmarks for GCC markets (sourcing under evaluation).
- **Global regions:** Siyana is region-agnostic by design — GCC ships first, with UK / US / ANZ / EU profiles to follow as a `region` dimension of the data (no rebrand, same package).
- More trades: fire & life-safety, BMS, vertical transport.
- Arabic-language content.
- Optional HTTP/SSE transport for hosted deployments.

---

## License

- **Code** (everything outside `data/`): [Apache-2.0](LICENSE).
- **Data** (the `data/` knowledge base): [CC BY 4.0](LICENSE-DATA).

Maintained by the community. <!-- Attribution ("Brought to you by Facilio") to be added once the project matures. -->
