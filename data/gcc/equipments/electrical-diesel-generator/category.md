---
id: electrical-diesel-generator
trade: electrical
asset_type: Diesel Generator Set
aliases:
  - DG set
  - genset
  - standby generator
  - emergency generator
specifications:
  - key: Rating
    value: 50–2,500 kVA typical
  - key: Voltage
    value: 400/230 V, 50 Hz
  - key: Start
    value: Auto-start on mains failure (AMF) via ATS
  - key: Cooling
    value: Radiator / water-cooled engine
ppm:
  - task: Visual check, fuel/coolant/oil levels, battery, and no-load run log
    frequency: Weekly
  - task: On-load test run (exercise) and transfer test via ATS
    frequency: Monthly
    standard_ref: Local fire & life-safety code (e.g. UAE Fire and Life Safety Code)
  - task: Change oil and filters, fuel filters, air filter; check belts and hoses
    frequency: Semi-annual or by running hours
    note: Dust shortens air-filter life — inspect more often; sand ingress is a top engine risk.
  - task: Coolant condition/concentration, radiator clean, exhaust and silencer check
    frequency: Annual
    note: Radiators clog with dust in plant rooms — clean to maintain cooling in high ambient.
  - task: Fuel polishing / tank water and sediment check
    frequency: Annual
    note: Humidity causes condensation and microbial growth ("diesel bug") in tanks.
common_faults:
  - symptom: Generator fails to start on mains failure
    likely_causes:
      - Flat or faulty starting battery
      - Fuel supply issue (empty, air-locked, blocked filter)
      - Controller in OFF/MANUAL or fault lockout
    resolution_steps:
      - Check battery voltage and charger; load-test/replace battery
      - Verify fuel level, prime system, and replace blocked filters
      - Read controller fault codes and reset after rectifying cause
    safety_notes: Exhaust gases are lethal in enclosed spaces; ensure ventilation. Hot/rotating parts.
  - symptom: Engine overheating during run
    likely_causes:
      - Dust-clogged radiator
      - Low coolant / failed thermostat
      - Plant-room ventilation inadequate for high ambient
    resolution_steps:
      - Clean radiator core and check coolant level/concentration
      - Verify plant-room intake/exhaust louvres and fans
      - Replace thermostat if faulty
sources:
  - https://www.cummins.com/generators
  - https://www.cat.com/en_US/products/new/power-systems.html
last_reviewed: 2026-06-08
---

An engine-driven alternator providing standby or emergency power on mains failure, with control, fuel, cooling, and exhaust systems. Mandatory for life-safety loads in GCC high-rises and critical facilities under local fire and life-safety codes.

## Region context

Dust and heat dominate: radiator and air-filter fouling cause overheating, and fuel-tank condensation breeds diesel bug. Disciplined load-bank/exercise testing is essential because these sets back life-safety systems.
