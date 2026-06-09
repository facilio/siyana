---
id: hvac-vrf-system
trade: hvac
asset_type: VRF/VRV System
aliases:
  - variable refrigerant flow
  - VRV
  - VRF
specifications:
  - key: Outdoor unit capacity
    value: 8–60 HP (modular combinations)
  - key: Refrigerant
    value: R-410A / R-32 (model-dependent)
  - key: Piping
    value: Long refrigerant runs with branch selectors / refnets
  - key: Control
    value: Inverter compressors, centralised controllers / BMS gateway
ppm:
  - task: Clean indoor unit filters
    frequency: Monthly
    note: Dust loading is high; monthly cleaning maintains airflow and efficiency.
  - task: Clean outdoor condenser coils
    frequency: Quarterly
    note: Sand/dust fouling raises head pressure and trips units in summer — clean quarterly minimum.
  - task: Check refrigerant pressures, subcooling, and inspect pipe insulation
    frequency: Semi-annual
    note: UV degrades exposed pipe lagging quickly; inspect and replace cracked insulation.
  - task: Inspect electrical connections, inverter PCBs, and drain pumps on indoor units
    frequency: Annual
common_faults:
  - symptom: Outdoor unit tripping on high pressure in summer
    likely_causes:
      - Dirty condenser coil
      - Restricted airflow / hot-air recirculation
      - Refrigerant overcharge
    resolution_steps:
      - Isolate power and clean condenser coils
      - Restore clearances and remove obstructions around the outdoor unit
      - Verify charge against OEM subcooling specification
    safety_notes: Handle refrigerant only with certified technicians; lockout/tagout before work.
  - symptom: Indoor unit error / no cooling on one zone
    likely_causes:
      - Communication fault on refrigerant-circuit address
      - Blocked condensate drain pump tripping float switch
      - Closed branch/refnet
    resolution_steps:
      - Read fault code on controller and reference OEM code list
      - Clear and test the condensate drain pump and float switch
      - Verify refrigerant-circuit communication wiring/addresses
sources:
  - https://www.daikin.com/products/ac/lineup/vrv
  - https://www.mitsubishielectric.com/ldg/ibim/en/products/vrf/
last_reviewed: 2026-06-08
---

A refrigerant-based system with one or more inverter-driven outdoor condensing units serving multiple indoor fan-coil units with variable refrigerant flow. Popular in GCC villas, offices, and retail for zoning flexibility and part-load efficiency.

## Region context

Long refrigerant runs plus extreme heat make charge accuracy and condenser cleanliness critical. Exposed outdoor piping insulation degrades fast under UV — include it in inspection rounds.
