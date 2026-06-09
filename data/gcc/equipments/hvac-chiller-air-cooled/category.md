---
id: hvac-chiller-air-cooled
trade: hvac
asset_type: Air-Cooled Chiller
aliases:
  - air cooled chiller
  - ACC
  - packaged chiller
specifications:
  - key: Typical capacity
    value: 40–500 TR per unit (scroll/screw compressors)
  - key: Chilled water supply temp
    value: 6–7 °C typical design
  - key: Refrigerant
    value: R-134a / R-410A / R-1234ze (model-dependent)
  - key: Condensing
    value: Air-cooled finned-tube coils with axial fans
ppm:
  - task: Clean condenser coils (de-scale fins, remove dust/sand)
    frequency: Quarterly
    note: In dusty 45 °C+ ambient, coils foul fast and lose capacity — inspect monthly and clean at least
      quarterly, more in sandstorm season. Fouled coils are the No.1 cause of summer trips.
    standard_ref: CIBSE Guide M frequency basis; OEM manual
  - task: Check refrigerant charge, superheat/subcooling, and log pressures
    frequency: Quarterly
    standard_ref: ASHRAE refrigeration practice
  - task: Inspect/torque electrical connections, check compressor amps and contactors
    frequency: Semi-annual
  - task: Test flow switch, calibrate chilled-water sensors, verify safeties/interlocks
    frequency: Annual
  - task: Vibration and oil analysis on screw compressors
    frequency: Annual
common_faults:
  - symptom: Unit tripping on high condensing/discharge pressure
    likely_causes:
      - Dirty or sand-fouled condenser coils
      - Condenser fan failure or reversed rotation
      - High ambient combined with airflow recirculation in plant yard
      - Refrigerant overcharge
    resolution_steps:
      - Isolate and lock off power; allow safe access
      - Inspect and clean condenser coils with approved coil cleaner and low-pressure water
      - Verify all condenser fans run and rotate in the correct direction
      - Check for hot-air recirculation/obstructions around the unit; restore clearances
      - Recheck head pressure; verify charge against OEM subcooling target
    safety_notes: Recover/handle refrigerant only with certified technicians and equipment. Isolate power and
      apply lockout/tagout before coil or fan work.
  - symptom: Low chilled-water flow / nuisance flow-switch trips
    likely_causes:
      - Clogged strainer
      - Closed/throttled valve or air lock in loop
      - Failed or mis-set flow switch
    resolution_steps:
      - Check and clean the chilled-water strainer
      - Verify valve line-up and bleed air from high points
      - Test flow switch operation and setpoint
sources:
  - https://www.cibse.org/ (CIBSE Guide M — maintenance frequencies)
  - https://www.carrier.com/commercial/en/eu/products/chillers/
  - https://www.daikin.com/products/ac/lineup/chillers
last_reviewed: 2026-06-08
---

A refrigeration machine that produces chilled water for building cooling, rejecting heat to ambient air via integral condenser coils and fans. Common as packaged units on rooftops or plant yards in GCC commercial and residential developments.

## Region context

High ambient temperature and airborne dust dominate failure modes in the Gulf. Specify high-ambient rated units (operation to 50–55 °C), increase coil-cleaning frequency, and ensure plant-yard layout avoids hot-air recirculation.
