#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { loadAssets } from "./data-loader.js";
import { buildTools } from "./tools/index.js";
import { DEFAULT_REGION, RegionSchema } from "./schema.js";
import { loadBenchmarks } from "./benchmarks.js";
import { createOpenMeteoClient } from "./weather/open-meteo.js";
import { buildAssetResources } from "./resources.js";
import { PROMPTS } from "./prompts.js";

const VERSION = "0.1.0";

const isTruthy = (v: string | undefined) => v === "1" || v === "true" || v === "yes";

async function main(): Promise<void> {
  // Load + validate the bundled knowledge base. A bad data file should fail loudly at startup.
  const store = loadAssets();
  const benchmarks = loadBenchmarks();

  // Region scope: SIYANA_REGION env overrides the default (gcc). Invalid values fall back with a warning.
  const envRegion = process.env.SIYANA_REGION;
  const parsedRegion = RegionSchema.safeParse(envRegion);
  if (envRegion && !parsedRegion.success) {
    process.stderr.write(
      `siyana: ignoring invalid SIYANA_REGION="${envRegion}" — using "${DEFAULT_REGION}".\n`,
    );
  }
  const defaultRegion = parsedRegion.success ? parsedRegion.data : DEFAULT_REGION;

  // Weather is an optional network layer. SIYANA_OFFLINE disables it entirely (knowledge tools stay).
  const offline = isTruthy(process.env.SIYANA_OFFLINE);
  const weather = offline ? undefined : createOpenMeteoClient();

  const server = new McpServer({
    name: "siyana",
    version: VERSION,
  });

  const ctx = { store, defaultRegion, availableRegions: store.availableRegions, weather, benchmarks };
  const tools = buildTools(ctx);
  for (const tool of tools) {
    server.tool(
      tool.name,
      tool.description,
      tool.inputShape,
      async (args: Record<string, unknown>) => tool.handler(args),
    );
  }

  // Resources — each category browsable at siyana://<region>/<id>.
  const resources = buildAssetResources(store);
  for (const r of resources) {
    server.resource(
      r.name,
      r.uri,
      { description: r.description, mimeType: "text/markdown" },
      async (uri) => ({ contents: [{ uri: uri.href, mimeType: "text/markdown", text: r.render() }] }),
    );
  }

  // Prompts — ready-made templates (PPM plan, fault triage, spec lookup).
  for (const p of PROMPTS) {
    server.prompt(p.name, p.description, p.args, async (args: Record<string, unknown>) => ({
      messages: [
        { role: "user", content: { type: "text", text: p.build(args as Record<string, string | undefined>) } },
      ],
    }));
  }

  // stderr only — stdout is reserved for the MCP stdio protocol.
  process.stderr.write(
    `siyana v${VERSION} ready — ${store.assets.length} assets, region "${defaultRegion}" (available: ${store.availableRegions.join(", ")}); ` +
      `${tools.length} tools, ${resources.length} resources, ${PROMPTS.length} prompts${offline ? " (offline: weather disabled)" : ", weather enabled"}.\n`,
  );

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  process.stderr.write(`siyana failed to start:\n${(err as Error).message}\n`);
  process.exit(1);
});
