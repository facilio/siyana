---
id: hvac-dehumidifier
trade: hvac
asset_type: Dehumidifier
aliases:
  - dehumidifier
  - desiccant dehumidifier
  - refrigerant dehumidifier
specifications:
  - key: Types
    value: Refrigerant (DX) or desiccant wheel
  - key: Application
    value: Pools, spas, basements, archives, dry stores
  - key: Control
    value: Humidistat / room RH setpoint
ppm:
  - task: Clean/replace air filters
    frequency: Monthly
    note: Dusty intake air loads filters fast and cuts capacity.
  - task: Clean evaporator/condenser coils and clear condensate drain (DX units)
    frequency: Quarterly
  - task: Inspect desiccant wheel, drive belt and seals; check reactivation heater (desiccant units)
    frequency: Semi-annual
  - task: Calibrate humidistat / RH sensor
    frequency: Annual
common_faults:
  - symptom: Space humidity not coming down
    likely_causes:
      - Clogged filter or fouled coil
      - Low refrigerant charge (DX)
      - Desiccant wheel not rotating / reactivation heater failed
      - Humidistat out of calibration
    resolution_steps:
      - Replace filters and clean coils
      - Check refrigerant charge and compressor (DX) — certified technician
      - Verify wheel rotation and reactivation heat (desiccant)
      - Recalibrate the humidistat
    safety_notes: Isolate power and apply lockout/tagout before electrical or refrigerant work; refrigerant handling by certified technicians only.
  - symptom: Water around the unit
    likely_causes:
      - Blocked condensate drain
      - Cracked drain pan
    resolution_steps:
      - Clear and flush the condensate drain
      - Inspect and reseal/replace the drain pan
sources:
  - https://www.cibse.org/ (CIBSE Guide M)
  - https://www.ashrae.org/technical-resources
last_reviewed: "2026-06-09"
---

A dehumidifier controls space humidity — by refrigerant (DX) coil or a desiccant wheel — for pools,
basements, archives and dry stores. In the Gulf's high outdoor humidity it works hard, so filter and
coil hygiene and accurate humidity sensing are what keep it effective.

## Region context

Coastal humidity drives heavy moisture loads and condensate volumes; keep drains spotless and expect
shorter filter life than temperate climates.
