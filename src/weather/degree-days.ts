/** Pure degree-day and seasonal helpers — no network, fully unit-testable. */

export interface DailyTemp {
  /** ISO date YYYY-MM-DD. */
  date: string;
  tmax_c: number;
  tmin_c: number;
}

/** Cooling degree-days: sum of max(0, daily mean − base) across the given days. */
export function coolingDegreeDays(days: DailyTemp[], baseC: number): number {
  return days.reduce((sum, d) => sum + Math.max(0, (d.tmax_c + d.tmin_c) / 2 - baseC), 0);
}

export type Season = "summer" | "winter" | "annual";

/** Northern-hemisphere season → calendar months. Southern hemisphere swaps summer/winter. */
export function seasonMonths(season: Season, latitude: number): number[] {
  if (season === "annual") return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const northern = latitude >= 0;
  const summer = [6, 7, 8, 9];
  const winter = [12, 1, 2];
  if (season === "summer") return northern ? summer : winter;
  return northern ? winter : summer;
}

/** Filter daily records to the months belonging to a season (annual passes everything through). */
export function daysInSeason(days: DailyTemp[], season: Season, latitude: number): DailyTemp[] {
  if (season === "annual") return days;
  const months = new Set(seasonMonths(season, latitude));
  return days.filter((d) => months.has(Number(d.date.slice(5, 7))));
}
