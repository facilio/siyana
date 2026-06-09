import { z } from "zod";
import { errorResult, json, regionInput, resolveRegion, type ToolFactory } from "./types.js";
import { TradeSchema } from "../schema.js";
import { buildAdvisories, type WeatherSummary } from "../weather/advisory.js";

export const getMaintenanceAdvisory: ToolFactory = (ctx) => ({
  name: "get_maintenance_advisory",
  description:
    "Turn the upcoming forecast into proactive maintenance advisories for a location — e.g. a heatwave prompting condenser-coil cleaning, or a dust event prompting filter checks. Optionally scope to an asset id (to flag the specific PPM tasks affected) or a trade. Live data from Open-Meteo; needs network access.",
  inputShape: {
    location: z.string().min(1).describe("City name or 'City, Country', e.g. 'Dubai'."),
    id: z.string().optional().describe("Optional asset id to tie advisories to its specific PPM tasks."),
    trade: TradeSchema.optional().describe("Optional: only return advisories relevant to this trade."),
    forecast_days: z.number().int().min(1).max(16).optional().describe("Forecast window (default 7)."),
    region: regionInput,
  },
  handler: async (args) => {
    if (!ctx.weather) return errorResult("Weather tools are disabled (server is running offline).");
    const region = resolveRegion(ctx, args);
    const days = typeof args.forecast_days === "number" ? args.forecast_days : 7;
    const tradeFilter = args.trade as string | undefined;

    try {
      const geo = await ctx.weather.geocode(String(args.location ?? ""));
      if (!geo) return errorResult(`Could not find location "${args.location}". Try 'City, Country'.`);
      const { daily } = await ctx.weather.forecast(geo.latitude, geo.longitude, days);
      if (daily.length === 0) return errorResult("No forecast data returned.");
      const maxDust = await ctx.weather.maxDust(geo.latitude, geo.longitude);

      const summary: WeatherSummary = {
        maxTempC: Math.max(...daily.map((d) => d.tmax_c)),
        minTempC: Math.min(...daily.map((d) => d.tmin_c)),
        maxHumidityPct: Math.max(
          ...daily.map((d) => d.humidity_max_pct ?? 0),
        ) || undefined,
        maxDust,
      };

      let advisories = buildAdvisories(summary);
      if (tradeFilter) advisories = advisories.filter((a) => a.trades.includes(tradeFilter));

      // If an asset is named, highlight which of its PPM tasks each advisory affects.
      let asset_tasks: Record<string, unknown> | undefined;
      if (args.id) {
        const asset = ctx.store.get(region, String(args.id));
        if (asset) {
          asset_tasks = {
            id: asset.id,
            asset_type: asset.asset_type,
            affected_tasks: advisories.map((a) => ({
              condition: a.condition,
              tasks: asset.ppm
                .filter((t) =>
                  a.keywords.some((k) => `${t.task} ${t.note ?? ""}`.toLowerCase().includes(k)),
                )
                .map((t) => ({ task: t.task, frequency: t.frequency })),
            })),
          };
        }
      }

      return json({
        location: `${geo.name}, ${geo.country_code}`,
        region,
        forecast_window_days: days,
        conditions: {
          max_temp_c: Math.round(summary.maxTempC),
          min_temp_c: Math.round(summary.minTempC),
          max_humidity_pct: summary.maxHumidityPct ? Math.round(summary.maxHumidityPct) : null,
          max_dust_pm10_ug_m3: maxDust ?? null,
        },
        advisories,
        asset: asset_tasks ?? null,
        note: advisories.length === 0 ? "No notable weather-driven maintenance actions in this window." : undefined,
        attribution: "Weather data by Open-Meteo.com (CC BY 4.0).",
      });
    } catch (err) {
      return errorResult((err as Error).message);
    }
  },
});
