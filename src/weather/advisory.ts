/** Pure weather→maintenance advisory rules. No network. */

export interface WeatherSummary {
  maxTempC: number;
  minTempC: number;
  maxHumidityPct?: number;
  maxDust?: number; // µg/m³ (PM10 / dust), if available
}

export interface Advisory {
  severity: "info" | "elevated" | "high";
  condition: string;
  message: string;
  /** Trades this advisory is most relevant to. */
  trades: string[];
  /** Keywords used to highlight matching PPM tasks for a specific asset. */
  keywords: string[];
}

/**
 * Map a near-term weather summary to maintenance advisories. Thresholds are tuned for hot, dusty,
 * humid climates (GCC default); they degrade sensibly elsewhere. Returns [] when nothing is notable.
 */
export function buildAdvisories(s: WeatherSummary): Advisory[] {
  const out: Advisory[] = [];

  if (s.maxTempC >= 50) {
    out.push({
      severity: "high",
      condition: `Extreme heat (${Math.round(s.maxTempC)}°C forecast)`,
      message:
        "Prioritise condenser/coil cleaning and verify high-ambient operation before the peak; check refrigerant charge and condenser fans. Inspect electrical terminations (heat reduces headroom).",
      trades: ["hvac", "electrical"],
      keywords: ["condenser", "coil", "refrigerant", "fan", "thermograph", "termination"],
    });
  } else if (s.maxTempC >= 45) {
    out.push({
      severity: "elevated",
      condition: `High heat (${Math.round(s.maxTempC)}°C forecast)`,
      message:
        "Bring condenser-coil cleaning forward and confirm cooling capacity headroom ahead of the hot spell.",
      trades: ["hvac"],
      keywords: ["condenser", "coil", "filter"],
    });
  }

  if (s.maxHumidityPct !== undefined && s.maxHumidityPct >= 75) {
    out.push({
      severity: "elevated",
      condition: `High humidity (${Math.round(s.maxHumidityPct)}% forecast)`,
      message:
        "Expect heavy condensate — clear AHU/FCU drain pans and traps, and check for biofilm/algae to prevent ceiling water damage.",
      trades: ["hvac"],
      keywords: ["condensate", "drain", "coil", "pan"],
    });
  }

  if (s.maxDust !== undefined && s.maxDust >= 150) {
    out.push({
      severity: s.maxDust >= 400 ? "high" : "elevated",
      condition: `Elevated dust (${Math.round(s.maxDust)} µg/m³)`,
      message:
        "Sandstorm/dust conditions — inspect and replace air filters early, and clean condenser/AHU coils that foul fast in dust.",
      trades: ["hvac"],
      keywords: ["filter", "coil", "condenser"],
    });
  }

  return out;
}
