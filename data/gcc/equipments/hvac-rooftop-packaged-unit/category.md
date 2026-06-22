---
id: hvac-rooftop-packaged-unit
trade: hvac
asset_type: Rooftop Packaged Unit (RTU)
aliases:
  - rooftop unit
  - RTU
  - packaged air conditioner
  - package unit
specifications:
  - key: Capacity
    value: 3–50+ TR per unit
  - key: Type
    value: Packaged DX, air-cooled condenser, constant or variable volume
  - key: Refrigerant
    value: R-410A / R-32 (model-dependent)
  - key: Options
    value: Economiser, fresh-air section, EC/variable-speed fans
ppm:
  - task: Inspect / replace return and fresh-air filters
    frequency: Monthly
    note: Roof-level dust loading is heavy; monthly checks prevent airflow loss and coil fouling.
  - task: Clean air-cooled condenser coil and check condenser fans
    frequency: Quarterly
    note: Sun + dust on the roof foul condensers fast and cause high-head trips in 50 °C ambient.
  - task: Clean evaporator coil, clear condensate drain, check fan belts/bearings
    frequency: Quarterly
  - task: Check refrigerant charge, superheat/subcooling and electrical connections
    frequency: Semi-annual
  - task: Inspect economiser dampers/actuators, curb seal and cabinet weatherproofing
    frequency: Semi-annual
common_faults:
  - symptom: Tripping on high head / poor cooling in peak summer
    likely_causes:
      - Dust-fouled condenser coil
      - Failed condenser fan or capacitor
      - High roof ambient with no clearance/recirculation
    resolution_steps:
      - Isolate power; clean condenser coil and verify all condenser fans run
      - Test fan motor capacitor/contactor
      - Restore clearances; confirm high-ambient operation rating
    safety_notes: Isolate power and follow lockout/tagout; refrigerant work by certified technicians. Roof-work
      permit and fall protection.
  - symptom: Unit runs but space won't cool
    likely_causes:
      - Low refrigerant charge (leak)
      - Failed/short-cycling compressor or contactor
      - Heavily loaded filters / frozen evaporator
    resolution_steps:
      - Replace filters; allow any ice to clear
      - Leak-test and verify charge
      - Test compressor contactor and capacitor
    safety_notes: Isolate power and apply lockout/tagout before electrical checks; refrigerant leak-test and recharge by certified technicians only.
  - symptom: Economiser not modulating fresh air
    likely_causes:
      - Seized damper or failed actuator
      - Control/BMS fault
    resolution_steps:
      - Free/replace damper actuator; verify linkage
      - Check economiser control logic and sensors
sources:
  - https://www.ashrae.org/technical-resources
  - https://www.cibse.org/ (CIBSE Guide M)
last_reviewed: 2026-06-08
---

A self-contained, roof-mounted DX air conditioner combining compressor, condenser, evaporator and supply fan in one weatherproof cabinet. Common over GCC retail, warehouses, and light-commercial where a central chilled-water plant isn't justified.

## Region context

Roof-mounted units bake in direct sun and dust at 50 °C — condenser cleanliness and high-ambient operation drive reliability and running cost. Curb weatherproofing also matters before the rare heavy rain events.
