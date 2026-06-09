---
id: hvac-energy-recovery-ventilator
trade: hvac
asset_type: Energy Recovery Ventilator (ERV / HRV)
aliases:
  - ERV
  - HRV
  - heat reclaim ventilation
  - heat recovery wheel
specifications:
  - key: Type
    value: Rotary enthalpy wheel or fixed-plate exchanger
  - key: Transfer
    value: Sensible + latent (enthalpy) recovery
  - key: Application
    value: Fresh-air pre-treatment ahead of AHU/FAHU coils
  - key: Filtration
    value: Filters on both supply and exhaust airstreams
ppm:
  - task: Inspect / replace filters on both supply and exhaust sides
    frequency: Monthly
    note: Outdoor-air intake means heavy dust loading; clogged filters cut recovery and airflow.
  - task: Clean the recovery wheel/plate media; check wheel rotation and drive belt
    frequency: Quarterly
    note: Dust and grease films on the media steadily erode recovery efficiency — clean on schedule.
  - task: Check purge sector and seals (rotary wheels) for cross-contamination
    frequency: Semi-annual
  - task: Verify bypass dampers, controls and measured effectiveness vs. design
    frequency: Annual
common_faults:
  - symptom: Poor recovery / higher downstream cooling load
    likely_causes:
      - Fouled wheel/plate media
      - Wheel not rotating (failed motor/belt)
      - Worn seals or open bypass
    resolution_steps:
      - Clean the media; confirm the wheel rotates and the belt is intact
      - Inspect and replace worn seals
      - Verify bypass damper position
  - symptom: Odour / cross-contamination between airstreams
    likely_causes:
      - Failed purge sector or seals
      - Negative pressure relationship drawing exhaust into supply
    resolution_steps:
      - Service purge sector and seals
      - Re-balance supply/exhaust pressures
sources:
  - https://www.ashrae.org/technical-resources (ASHRAE 62.1; energy recovery)
  - https://www.cibse.org/ (CIBSE Guide M)
last_reviewed: 2026-06-08
---

A ventilation device that pre-conditions incoming fresh air by exchanging heat (and often moisture) with the exhaust airstream, via a rotary enthalpy wheel or plate exchanger. In the Gulf it slashes the cooling/latent load of bringing in hot, humid outdoor air.

## Region context

Pre-treating hot, humid Gulf outdoor air is where ERVs earn their keep — but the same intake exposes them to heavy dust, so filter and media hygiene directly protect both recovery efficiency and IAQ.
