import type { ZodRawShape } from "zod";
import type { LoadResult } from "../data-loader.js";
import { RegionSchema, type Region } from "../schema.js";
import type { WeatherClient } from "../weather/open-meteo.js";
import type { Benchmark } from "../benchmarks.js";

/** Everything a tool needs: the loaded knowledge base, region scope, and the optional weather layer. */
export interface ToolContext {
  store: LoadResult;
  /** Region the server is scoped to (from SIYANA_REGION), used when a call omits `region`. */
  defaultRegion: Region;
  /** Regions that actually have data, for discovery. */
  availableRegions: string[];
  /** Live weather client (Open-Meteo). Absent when the server runs offline. */
  weather?: WeatherClient;
  /** Region energy benchmarks for the cooling-energy estimator. */
  benchmarks: Map<Region, Benchmark>;
}

export interface ToolResult {
  content: Array<{ type: "text"; text: string }>;
  isError?: boolean;
  /** Index signature required by the MCP SDK's CallToolResult type. */
  [key: string]: unknown;
}

export interface ToolDef {
  name: string;
  description: string;
  inputShape: ZodRawShape;
  handler: (args: Record<string, unknown>) => ToolResult | Promise<ToolResult>;
}

/** Tool factory: given the context, produce a tool definition. */
export type ToolFactory = (ctx: ToolContext) => ToolDef;

/** Resolve the region for a call: explicit `region` arg if valid, else the server's default scope. */
export function resolveRegion(ctx: ToolContext, args: Record<string, unknown>): Region {
  const parsed = RegionSchema.safeParse(args.region);
  return parsed.success ? parsed.data : ctx.defaultRegion;
}

/** Reusable optional `region` input field for region-aware tools. */
export const regionInput = RegionSchema.optional().describe(
  "Region scope for guidance (gcc | uk | us | anz | eu). Defaults to the server's configured region (SIYANA_REGION, default gcc).",
);

/** Wrap any JSON-serialisable value as an MCP text result. */
export function json(value: unknown): ToolResult {
  return { content: [{ type: "text", text: JSON.stringify(value, null, 2) }] };
}

export function errorResult(message: string): ToolResult {
  return { content: [{ type: "text", text: message }], isError: true };
}
