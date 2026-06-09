---
id: hvac-fahu
trade: hvac
asset_type: Fresh Air Handling Unit (FAHU)
aliases:
  - FAHU
  - fresh air unit
  - DOAS
specifications:
  - key: Function
    value: 100% fresh air treatment / dehumidification
  - key: Cooling coil
    value: Deep chilled-water coil (8–10 row) for latent load
  - key: Heat recovery
    value: Optional enthalpy wheel or run-around coil
  - key: Filtration
    value: G4 + F7 minimum
ppm:
  - task: Replace pre-filters and inspect fine filters
    frequency: Monthly
    note: Outdoor intake means heavy dust/sand loading — expect shorter filter life than recirc AHUs.
  - task: Clean deep cooling coil and verify condensate removal (high latent load)
    frequency: Quarterly
    note: High humidity = high condensate volume; drains and traps must be spotless.
  - task: Inspect heat-recovery wheel/coil, clean and check rotation/seals
    frequency: Quarterly
  - task: Verify space pressurisation and outdoor-air flow rates
    frequency: Semi-annual
    standard_ref: ASHRAE 62.1
common_faults:
  - symptom: High indoor humidity despite FAHU running
    likely_causes:
      - Undersized/fouled cooling coil not meeting latent load
      - Chilled water temperature too high
      - Excess outdoor air or building infiltration
    resolution_steps:
      - Clean cooling coil and verify chilled-water flow/temperature
      - Confirm coil leaving-air dewpoint against design
      - Check building pressurisation and seal infiltration paths
  - symptom: Frequent filter blockage alarms
    likely_causes:
      - Sandstorm/dust event
      - Pre-filter stage missing or wrong grade
    resolution_steps:
      - Replace pre-filters; consider higher dust-holding pre-filter
      - Verify intake louvre and sand-trap louvre condition
sources:
  - https://www.ashrae.org/technical-resources (ASHRAE 62.1)
  - https://www.cibse.org/ (CIBSE Guide M)
last_reviewed: 2026-06-08
---

An AHU dedicated to treating 100% outdoor air for ventilation, dehumidification, and pressurisation before distribution. Critical in the GCC where outdoor air is hot and humid; often paired with heat-recovery wheels or run-around coils.

## Region context

The hardest-working air unit in Gulf buildings: it carries the latent (humidity) load and the full dust burden of outdoor intake. Prioritise sand-trap louvres, generous pre-filtration, and deep coils sized for design dewpoint.
