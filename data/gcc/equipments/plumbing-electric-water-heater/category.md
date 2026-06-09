---
id: plumbing-electric-water-heater
trade: plumbing
asset_type: Electric Water Heater
aliases:
  - water heater
  - geyser
  - calorifier
  - storage water heater
specifications:
  - key: Capacity
    value: 15–300 L (point-of-use to central)
  - key: Heating
    value: Immersion element(s) with thermostat
  - key: Safety
    value: Temperature & pressure relief valve (T&P), thermal cut-out
  - key: Anode
    value: Sacrificial magnesium/aluminium anode rod
ppm:
  - task: Test temperature & pressure relief (T&P) valve; check for leaks
    frequency: Annual
    standard_ref: Manufacturer safety guidance
  - task: Descale element and tank; flush sediment
    frequency: Annual
    note: Hard GCC water scales elements fast, cutting efficiency and causing element burnout — descaling is the
      single most important task.
  - task: Inspect/replace sacrificial anode rod
    frequency: Annual
    note: Anode depletes faster with hard/aggressive water; replace to prevent tank corrosion.
  - task: Check thermostat calibration and electrical connections
    frequency: Annual
common_faults:
  - symptom: No hot water / slow heating
    likely_causes:
      - Failed heating element (often scale-induced burnout)
      - Tripped thermal cut-out or faulty thermostat
      - Tripped breaker / loose connection
    resolution_steps:
      - Isolate power; test element continuity and resistance; replace if failed
      - Reset/replace thermal cut-out and test thermostat
      - Check breaker and tighten electrical connections
    safety_notes: Isolate power and confirm dead before work; drain safely — water may be scalding.
  - symptom: Relief valve dripping / water around unit
    likely_causes:
      - High supply pressure (no/failed PRV)
      - Faulty or scaled T&P valve
      - Tank or fitting corrosion/leak
    resolution_steps:
      - Check incoming pressure; fit/service a pressure-reducing valve if high
      - Test and replace the T&P valve if not reseating
      - Inspect tank/fittings for corrosion; replace if leaking
sources:
  - https://www.ariston.com/ (storage water heater maintenance guidance)
  - https://www.cibse.org/ (CIBSE Guide M; hot-water service)
last_reviewed: 2026-06-08
---

An electrically heated storage vessel supplying domestic hot water, with thermostat, heating element, and safety devices. Found in GCC apartments and villas; central calorifiers serve larger buildings. A scale-prone asset due to hard supply water.

## Region context

Hard water makes scaling and element burnout the dominant failure mode. Annual descaling, anode replacement, and a working pressure-reducing valve dramatically extend heater life.
