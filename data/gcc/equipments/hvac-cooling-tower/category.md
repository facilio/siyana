---
id: hvac-cooling-tower
trade: hvac
asset_type: Cooling Tower
aliases:
  - cooling tower
  - CT
  - evaporative heat rejection
specifications:
  - key: Type
    value: Open-circuit (counterflow/crossflow) or closed-circuit
  - key: Fill
    value: Film or splash fill media
  - key: Make-up
    value: Continuous, to replace evaporation/drift/blowdown
  - key: Materials
    value: HDG steel, FRP, or stainless basin
ppm:
  - task: Inspect basin, clean debris/silt, check make-up float and overflow
    frequency: Monthly
  - task: Water treatment check — biocide, scale/corrosion inhibitor, conductivity/blowdown
    frequency: Weekly
    note: High evaporation rates and hard make-up water accelerate scaling; maintain dosing and blowdown
      rigorously. Hot climate raises Legionella risk — keep biocide regime strict.
    standard_ref: Local public-health guidance; CIBSE TM13 / cooling-water best practice
  - task: Legionella sampling and dip-slide testing
    frequency: Quarterly
    standard_ref: Cooling-water risk-assessment regime
  - task: Inspect fill, drift eliminators, fan, gearbox/belt, and nozzles
    frequency: Quarterly
  - task: Full clean and disinfection of basin and wetted surfaces
    frequency: Semi-annual
common_faults:
  - symptom: Scale build-up on fill and poor heat rejection
    likely_causes:
      - Insufficient blowdown / high cycles of concentration
      - Failed scale-inhibitor dosing
      - Hard make-up water
    resolution_steps:
      - Verify and correct blowdown / conductivity controller setpoints
      - Check chemical dosing pumps and inhibitor stock
      - Descale or replace fouled fill media
  - symptom: Low condenser-water flow / high chiller condensing temperature
    likely_causes:
      - Clogged strainer or nozzles
      - Pump issue
      - Basin level low / air entrainment
    resolution_steps:
      - Clean strainers and spray nozzles
      - Verify make-up and basin level
      - Check condenser-water pump operation
sources:
  - https://www.cibse.org/ (CIBSE TM13 — minimising Legionella risk)
  - https://www.ashrae.org/technical-resources (ASHRAE 188 Legionellosis)
last_reviewed: 2026-06-08
---

An evaporative heat-rejection device that cools condenser water from water-cooled chillers by exposing it to an airstream. Used on larger GCC plants where water-cooled chillers are economic. A key Legionella control point.

## Region context

Extreme evaporation, hard water, and high ambient combine to accelerate scaling and microbial growth. Disciplined water treatment, blowdown, and Legionella control are non-negotiable.
