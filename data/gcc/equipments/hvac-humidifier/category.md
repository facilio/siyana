---
id: hvac-humidifier
trade: hvac
asset_type: Humidifier
aliases:
  - humidifier
  - steam humidifier
  - evaporative humidifier
specifications:
  - key: Types
    value: Electrode/resistive steam, or evaporative/adiabatic
  - key: Application
    value: Data centres, hospitals, printing, museums — RH control
  - key: Water
    value: Mains or treated/RO feed (scaling-dependent)
ppm:
  - task: Descale / replace the steam cylinder or evaporative media
    frequency: Quarterly
    note: Hard GCC water scales electrode cylinders fast — descaling/replacement is the dominant task.
  - task: Check water feed, fill/drain valves and conductivity control
    frequency: Quarterly
  - task: Inspect distribution pipework/lances for blockage and leaks
    frequency: Semi-annual
  - task: Calibrate RH sensor and verify hygiene (Legionella for evaporative types)
    frequency: Annual
    standard_ref: Local water-hygiene guidance
common_faults:
  - symptom: Low or no humidity output
    likely_causes:
      - Scaled-up steam cylinder / electrodes
      - Blocked water feed or fill valve
      - RH sensor out of calibration
    resolution_steps:
      - Descale or replace the cylinder
      - Clear the water feed and test the fill valve
      - Recalibrate the humidity sensor
    safety_notes: Steam and hot surfaces scald; isolate power and water and allow to cool before service.
  - symptom: Repeated cylinder failures / short life
    likely_causes:
      - Very hard or untreated feed water
      - Conductivity controller mis-set
    resolution_steps:
      - Review water quality; consider softened/RO feed
      - Re-set conductivity / drain-cycle parameters
sources:
  - https://www.cibse.org/ (CIBSE Guide M)
  - https://www.ashrae.org/technical-resources
last_reviewed: "2026-06-09"
---

A humidifier adds moisture for tight RH control in data centres, hospitals, museums and similar. In
the Gulf, hard supply water scales steam cylinders quickly, so descaling (or treated/RO feed) and
accurate RH sensing are the recurring maintenance levers.

## Region context

Hard water is the enemy: electrode cylinders fur up fast. Treated/RO feed water and a disciplined
descale/replace cycle dramatically extend service life.
