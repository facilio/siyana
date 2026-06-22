---
id: hvac-condensing-unit
trade: hvac
asset_type: Condensing Unit
aliases:
  - condensing unit
  - ODU
  - outdoor condensing unit
specifications:
  - key: Function
    value: Outdoor compressor + air-cooled condenser for split / ducted-split DX systems
  - key: Refrigerant
    value: R-410A / R-32 (model-dependent)
  - key: Capacity
    value: 1–20 TR typical
ppm:
  - task: Clean the condenser coil and check condenser fan
    frequency: Quarterly
    note: Sun + dust foul outdoor coils fast and cause summer high-head trips.
  - task: Check refrigerant pressures, superheat/subcooling and pipe insulation
    frequency: Semi-annual
    note: UV degrades exposed pipe lagging quickly — inspect and replace cracked insulation.
  - task: Inspect electrical connections, contactors and capacitor
    frequency: Semi-annual
common_faults:
  - symptom: Tripping on high pressure in summer
    likely_causes:
      - Dust-fouled condenser coil
      - Failed condenser fan or capacitor
      - High ambient with restricted airflow / recirculation
    resolution_steps:
      - Isolate power; clean the condenser coil
      - Test the fan motor and capacitor
      - Restore clearances and confirm high-ambient rating
    safety_notes: Isolate power and apply lockout/tagout; refrigerant work by certified technicians only.
  - symptom: Compressor runs but little/no cooling
    likely_causes:
      - Low refrigerant charge (leak)
      - Failed compressor valves
    resolution_steps:
      - Leak-test and verify charge
      - Assess compressor performance; replace if failed
    safety_notes: Recover refrigerant per regulations; certified technicians only.
sources:
  - https://www.daikin.com/products/ac
  - https://www.cibse.org/ (CIBSE Guide M)
last_reviewed: "2026-06-09"
---

A condensing unit is the outdoor compressor-and-condenser half of a split or ducted-split DX system.
Roof- or wall-mounted in full Gulf sun and dust, its reliability comes down to condenser cleanliness,
correct charge, and protecting the refrigerant pipe insulation from UV.

## Region context

Outdoor coils foul quickly in 45 °C+ dusty conditions and exposed pipe lagging perishes under UV —
both are leading causes of summer high-head trips and lost capacity.
