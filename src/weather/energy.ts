/** Pure cooling-energy estimation — degree-day × benchmark method. No network. */

const SQFT_TO_M2 = 0.092903;
const KW_PER_TR = 3.517; // 1 ton of refrigeration ≈ 3.517 kW

export function sqftToM2(sqft: number): number {
  return sqft * SQFT_TO_M2;
}

export interface EnergyInputs {
  area_m2: number;
  /** Cooling energy-use intensity benchmark for the building type/region (kWh/m²/yr). */
  cooling_eui_typical: number;
  cooling_eui_low?: number;
  cooling_eui_high?: number;
  /** Live cooling-degree-days for the requested period at this location. */
  period_cdd: number;
  /** Regional reference annual CDD the EUI benchmark is calibrated to. */
  reference_annual_cdd: number;
  /** Optional peak cooling-load density (W/m²) for an indicative plant-size figure. */
  cooling_load_w_per_m2?: number;
  /** Optional electricity tariff (currency per kWh) to also return an indicative cost. */
  tariff_per_kwh?: number;
}

export interface EnergyEstimate {
  estimate_kwh: number;
  low_kwh?: number;
  high_kwh?: number;
  cdd_ratio: number;
  indicative_peak_cooling_tr?: number;
  estimate_cost?: number;
}

/**
 * Allocate a benchmark annual cooling EUI to the requested period by the ratio of the period's
 * live degree-days to the region's reference annual degree-days. This captures both the seasonal
 * split and how hot the specific location runs versus the regional norm.
 */
export function estimateCoolingEnergy(i: EnergyInputs): EnergyEstimate {
  const ratio = i.reference_annual_cdd > 0 ? i.period_cdd / i.reference_annual_cdd : 0;
  const kwh = (eui: number) => Math.round(i.area_m2 * eui * ratio);

  const estimate: EnergyEstimate = {
    estimate_kwh: kwh(i.cooling_eui_typical),
    cdd_ratio: Math.round(ratio * 1000) / 1000,
  };
  if (i.cooling_eui_low !== undefined) estimate.low_kwh = kwh(i.cooling_eui_low);
  if (i.cooling_eui_high !== undefined) estimate.high_kwh = kwh(i.cooling_eui_high);
  if (i.cooling_load_w_per_m2 !== undefined) {
    estimate.indicative_peak_cooling_tr =
      Math.round(((i.area_m2 * i.cooling_load_w_per_m2) / 1000 / KW_PER_TR) * 10) / 10;
  }
  if (i.tariff_per_kwh !== undefined) {
    estimate.estimate_cost = Math.round(estimate.estimate_kwh * i.tariff_per_kwh);
  }
  return estimate;
}
