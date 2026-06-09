---
id: hvac-chiller-water-cooled
trade: hvac
asset_type: Water-Cooled Centrifugal Chiller
aliases:
  - water cooled chiller
  - centrifugal chiller
  - WCC
specifications:
  - key: Typical capacity
    value: 150–3,000+ TR
  - key: Chilled water supply
    value: 6–7 °C design
  - key: Condenser water
    value: ~30–35 °C, from cooling towers
  - key: Refrigerant
    value: R-134a / R-513A / R-1233zd (model-dependent)
  - key: Compressor
    value: Centrifugal (incl. magnetic-bearing oil-free) or screw
ppm:
  - task: Monitor and log approach temperatures, kW/TR, pressures and flows
    frequency: Weekly
    note: Rising condenser approach is the early warning of tube fouling — the dominant GCC efficiency loss.
  - task: Condenser water chemistry — treatment, conductivity, blowdown
    frequency: Weekly
    note: Hard make-up water scales condenser tubes fast; disciplined treatment protects kW/TR and capacity.
    standard_ref: Cooling-water best practice (CIBSE / ASHRAE)
  - task: Mechanical condenser tube cleaning (brush) and inspection
    frequency: Annual
    note: Plan during low-load season; eddy-current test tubes periodically for wall loss.
  - task: Oil analysis, refrigerant charge/purge of non-condensables, IGV/vane check
    frequency: Semi-annual
    standard_ref: ASHRAE refrigeration practice; OEM
  - task: Megger motor, calibrate sensors, test safeties (low-evap, high-condenser, surge)
    frequency: Annual
common_faults:
  - symptom: High condensing pressure / high lift / capacity loss
    likely_causes:
      - Scaled or fouled condenser tubes
      - Low condenser-water flow or high condenser-water temperature (cooling-tower side)
      - Non-condensables (air) in the refrigerant circuit
    resolution_steps:
      - Compare condenser approach against commissioning baseline
      - Verify condenser-water flow and supply temperature; check cooling-tower performance
      - Purge non-condensables; clean/brush condenser tubes if approach is high
    safety_notes: Refrigerant recovery and circuit work by certified technicians only; isolate medium/low-voltage
      supply and follow lockout/tagout.
  - symptom: Centrifugal compressor surge (cyclic noise/vibration)
    likely_causes:
      - High lift at low load
      - Low condenser-water flow or high condenser-water temperature
      - Fouled condenser raising head
    resolution_steps:
      - Check IGV/vane control and staging
      - Lower lift — verify condenser-water temperature/flow and tower operation
      - Clean condenser if fouled
  - symptom: Low chilled-water temperature / nuisance trips
    likely_causes:
      - Clogged strainer or low evaporator flow
      - Mis-calibrated sensor or setpoint
    resolution_steps:
      - Clean evaporator strainer; verify flow
      - Calibrate chilled-water sensors and review safety setpoints
sources:
  - https://www.ashrae.org/technical-resources (ASHRAE refrigeration & chiller practice)
  - https://www.cibse.org/ (CIBSE Guide M)
last_reviewed: 2026-06-08
---

A large-capacity chiller that produces chilled water and rejects heat to a condenser-water loop served by cooling towers. Centrifugal (often mag-bearing/oil-free) or screw compressors. The efficient backbone of district and large-building cooling across GCC developments.

## Region context

In the Gulf, condenser-side scaling and elevated condenser-water temperatures dominate efficiency loss. Tube cleaning, rigorous water treatment, and cooling-tower performance are the main levers for kW/TR — track condenser approach as the leading indicator.
