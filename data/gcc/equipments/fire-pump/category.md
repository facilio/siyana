---
id: fire-pump
trade: fire
asset_type: Fire Pump
aliases:
  - fire pump
  - fire pump set
  - jockey pump
  - sprinkler pump
specifications:
  - key: Configuration
    value: Electric and/or diesel duty pump + jockey (pressure-maintenance) pump
  - key: Standard basis
    value: Listed set per NFPA 20 / local civil-defence approval
  - key: Control
    value: Automatic start on pressure drop; manual stop
ppm:
  - task: Weekly no-flow (churn) test run — electric and diesel
    frequency: Weekly
    note: Mandatory under most GCC civil-defence regimes; log start, run and pressures.
    standard_ref: NFPA 25 / NFPA 20; local fire & life-safety code
  - task: Annual full-flow performance test against the pump curve
    frequency: Annual
    standard_ref: NFPA 25
  - task: Diesel engine — fuel, coolant, battery, and exercise; fuel-tank water/sediment check
    frequency: Monthly
    note: Humidity causes diesel-tank condensation ("diesel bug") — keep tanks topped and treated.
  - task: Check jockey pump cut-in/out, valves locked open, and controller alarms
    frequency: Monthly
common_faults:
  - symptom: Pump fails to start on demand
    likely_causes:
      - Flat/failed starting battery (diesel) or controller in OFF/MANUAL
      - Fuel issue (diesel) — empty, air-locked, blocked filter
      - Pressure-sensing line fault
    resolution_steps:
      - Check battery and charger; confirm controller in AUTO
      - Verify fuel supply, prime and replace blocked filters
      - Inspect the pressure-sensing line and switch
    safety_notes: >-
      Life-safety system — coordinate any isolation with the building's fire strategy and the civil-defence
      authority, provide a fire watch while impaired, and restore to AUTO after testing. Diesel exhaust and
      rotating parts hazards.
  - symptom: Pump runs but pressure/flow is low
    likely_causes:
      - Closed/throttled valve in the suction or discharge
      - Worn impeller or air in casing
      - Blocked suction strainer
    resolution_steps:
      - Verify all valves are locked open; bleed air
      - Clean the suction strainer
      - Assess impeller wear against the performance curve
sources:
  - https://www.nfpa.org/ (NFPA 20 design; NFPA 25 inspection, testing & maintenance)
  - "Local civil-defence fire & life-safety code (e.g. UAE Fire and Life Safety Code)"
last_reviewed: "2026-06-09"
---

A fire pump set maintains sprinkler/hydrant system pressure and delivers design flow on demand —
typically an electric and/or diesel duty pump with a jockey pump. It's a mandatory, code-tested
life-safety asset: weekly churn tests and annual flow tests are the heartbeat of its maintenance.

## Region context

GCC civil-defence authorities mandate documented periodic testing. Diesel sets also suffer fuel-tank
condensation and "diesel bug" in the humidity, and plant-room heat stresses batteries — keep both in
the test regime.
