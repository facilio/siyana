import type { ToolContext, ToolFactory } from "./types.js";
import { listAssetCategories } from "./listAssetCategories.js";
import { searchAssets } from "./searchAssets.js";
import { getAssetSpec } from "./getAssetSpec.js";
import { getPpmSchedule } from "./getPpmSchedule.js";
import { getFaultResolution } from "./getFaultResolution.js";
import { getWeather } from "./getWeather.js";
import { estimateCoolingEnergy } from "./estimateCoolingEnergy.js";
import { getMaintenanceAdvisory } from "./getMaintenanceAdvisory.js";

/** Offline, deterministic knowledge tools — always available. */
const KNOWLEDGE_TOOLS: ToolFactory[] = [
  listAssetCategories,
  searchAssets,
  getAssetSpec,
  getPpmSchedule,
  getFaultResolution,
];

/** Live tools that need network (Open-Meteo). Registered unless the server runs offline. */
const WEATHER_TOOLS: ToolFactory[] = [getWeather, estimateCoolingEnergy, getMaintenanceAdvisory];

export function buildTools(ctx: ToolContext) {
  const factories = ctx.weather ? [...KNOWLEDGE_TOOLS, ...WEATHER_TOOLS] : KNOWLEDGE_TOOLS;
  return factories.map((factory) => factory(ctx));
}

export * from "./types.js";
