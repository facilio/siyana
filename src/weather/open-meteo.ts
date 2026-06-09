import type { DailyTemp } from "./degree-days.js";

/**
 * Thin Open-Meteo client. Open-Meteo is free, open data, and needs no API key.
 * Data © Open-Meteo.com (CC BY 4.0) — https://open-meteo.com. Knowledge tools never call this;
 * only the weather tools do, and they handle failures gracefully so the server still works offline.
 */

export interface GeoLocation {
  name: string;
  country: string;
  country_code: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface CurrentWeather {
  temperature_c: number | null;
  humidity_pct: number | null;
  wind_speed_kmh: number | null;
}

export interface ForecastDay {
  date: string;
  tmax_c: number;
  tmin_c: number;
  humidity_max_pct: number | null;
  precipitation_mm: number | null;
}

export interface WeatherClient {
  geocode(name: string): Promise<GeoLocation | null>;
  forecast(lat: number, lon: number, days: number): Promise<{ current: CurrentWeather; daily: ForecastDay[] }>;
  /** Daily temps for the trailing ~year (used for degree-day estimation). */
  trailingYear(lat: number, lon: number, today: Date): Promise<DailyTemp[]>;
  /** Max dust / PM10 over the next few days, if the air-quality endpoint responds. */
  maxDust(lat: number, lon: number): Promise<number | undefined>;
}

const GEO = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST = "https://api.open-meteo.com/v1/forecast";
const ARCHIVE = "https://archive-api.open-meteo.com/v1/archive";
const AIR = "https://air-quality-api.open-meteo.com/v1/air-quality";

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}
function addDays(d: Date, n: number): Date {
  const x = new Date(d.getTime());
  x.setUTCDate(x.getUTCDate() + n);
  return x;
}

export interface OpenMeteoOptions {
  timeoutMs?: number;
  cacheTtlMs?: number;
  fetchImpl?: typeof fetch;
}

export function createOpenMeteoClient(opts: OpenMeteoOptions = {}): WeatherClient {
  const timeoutMs = opts.timeoutMs ?? 8000;
  const ttl = opts.cacheTtlMs ?? 30 * 60 * 1000; // 30 min
  const doFetch = opts.fetchImpl ?? fetch;
  const cache = new Map<string, { expires: number; value: unknown }>();

  async function getJson<T>(url: string): Promise<T> {
    const hit = cache.get(url);
    const now = Date.now();
    if (hit && hit.expires > now) return hit.value as T;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await doFetch(url, { signal: controller.signal });
      if (!res.ok) throw new Error(`Open-Meteo request failed (${res.status}) for ${url}`);
      const value = (await res.json()) as T;
      cache.set(url, { expires: now + ttl, value });
      return value;
    } catch (err) {
      throw new Error(
        `Weather lookup failed: ${(err as Error).message}. The weather tools need network access — knowledge tools still work offline.`,
      );
    } finally {
      clearTimeout(timer);
    }
  }

  return {
    async geocode(name) {
      const url = `${GEO}?name=${encodeURIComponent(name)}&count=1&language=en&format=json`;
      const data = await getJson<{ results?: Array<Record<string, unknown>> }>(url);
      const r = data.results?.[0];
      if (!r) return null;
      return {
        name: String(r.name),
        country: String(r.country ?? ""),
        country_code: String(r.country_code ?? ""),
        latitude: Number(r.latitude),
        longitude: Number(r.longitude),
        timezone: String(r.timezone ?? "auto"),
      };
    },

    async forecast(lat, lon, days) {
      const url =
        `${FORECAST}?latitude=${lat}&longitude=${lon}` +
        `&current=temperature_2m,relative_humidity_2m,wind_speed_10m` +
        `&daily=temperature_2m_max,temperature_2m_min,relative_humidity_2m_max,precipitation_sum` +
        `&forecast_days=${days}&timezone=auto`;
      const d = await getJson<{
        current?: Record<string, number>;
        daily?: Record<string, (number | null)[]> & { time: string[] };
      }>(url);
      const cur = d.current ?? {};
      const dy = d.daily;
      const daily: ForecastDay[] = (dy?.time ?? []).map((date, i) => ({
        date,
        tmax_c: Number(dy?.temperature_2m_max?.[i]),
        tmin_c: Number(dy?.temperature_2m_min?.[i]),
        humidity_max_pct: dy?.relative_humidity_2m_max?.[i] ?? null,
        precipitation_mm: dy?.precipitation_sum?.[i] ?? null,
      }));
      return {
        current: {
          temperature_c: cur.temperature_2m ?? null,
          humidity_pct: cur.relative_humidity_2m ?? null,
          wind_speed_kmh: cur.wind_speed_10m ?? null,
        },
        daily,
      };
    },

    async trailingYear(lat, lon, today) {
      const end = addDays(today, -6); // archive lags a few days
      const start = addDays(end, -369);
      const url =
        `${ARCHIVE}?latitude=${lat}&longitude=${lon}` +
        `&start_date=${isoDate(start)}&end_date=${isoDate(end)}` +
        `&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
      const d = await getJson<{ daily?: { time: string[]; temperature_2m_max: (number | null)[]; temperature_2m_min: (number | null)[] } }>(url);
      const dy = d.daily;
      if (!dy) return [];
      return dy.time
        .map((date, i) => ({
          date,
          tmax_c: Number(dy.temperature_2m_max[i]),
          tmin_c: Number(dy.temperature_2m_min[i]),
        }))
        .filter((r) => Number.isFinite(r.tmax_c) && Number.isFinite(r.tmin_c));
    },

    async maxDust(lat, lon) {
      try {
        const url = `${AIR}?latitude=${lat}&longitude=${lon}&hourly=pm10,dust&forecast_days=3&timezone=auto`;
        const d = await getJson<{ hourly?: { pm10?: (number | null)[]; dust?: (number | null)[] } }>(url);
        const vals = [...(d.hourly?.pm10 ?? []), ...(d.hourly?.dust ?? [])].filter(
          (v): v is number => typeof v === "number",
        );
        return vals.length ? Math.max(...vals) : undefined;
      } catch {
        return undefined; // air-quality is best-effort
      }
    },
  };
}
