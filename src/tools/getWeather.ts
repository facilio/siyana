import { z } from "zod";
import { errorResult, json, type ToolFactory } from "./types.js";

export const getWeather: ToolFactory = (ctx) => ({
  name: "get_weather",
  description:
    "Get current conditions and a daily forecast for a location (city name or 'City, Country'), plus any elevated dust/PM10. Useful context for maintenance planning and energy questions. Live data from Open-Meteo; needs network access.",
  inputShape: {
    location: z.string().min(1).describe("City name or 'City, Country', e.g. 'Dubai' or 'Abu Dhabi, AE'."),
    forecast_days: z.number().int().min(1).max(16).optional().describe("Forecast days (default 7)."),
  },
  handler: async (args) => {
    if (!ctx.weather) return errorResult("Weather tools are disabled (server is running offline).");
    const location = String(args.location ?? "");
    const days = typeof args.forecast_days === "number" ? args.forecast_days : 7;
    try {
      const geo = await ctx.weather.geocode(location);
      if (!geo) return errorResult(`Could not find location "${location}". Try 'City, Country'.`);
      const { current, daily } = await ctx.weather.forecast(geo.latitude, geo.longitude, days);
      const maxDust = await ctx.weather.maxDust(geo.latitude, geo.longitude);
      return json({
        location: `${geo.name}, ${geo.country_code}`,
        coordinates: { latitude: geo.latitude, longitude: geo.longitude },
        current,
        forecast: daily,
        max_dust_pm10_ug_m3: maxDust ?? null,
        attribution: "Weather data by Open-Meteo.com (CC BY 4.0).",
      });
    } catch (err) {
      return errorResult((err as Error).message);
    }
  },
});
