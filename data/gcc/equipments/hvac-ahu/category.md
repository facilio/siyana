---
id: hvac-ahu
trade: hvac
asset_type: Air Handling Unit (AHU)
aliases:
  - AHU
  - air handler
specifications:
  - key: Airflow range
    value: 1,000–60,000 m³/h (application-dependent)
  - key: Cooling coil
    value: Chilled-water finned coil, 6-row typical
  - key: Filtration
    value: G4 pre-filter + F7/F9 fine filters (EN ISO 16890)
  - key: Fan type
    value: Belt-driven or EC plug fans
ppm:
  - task: Inspect and replace/clean air filters
    frequency: Monthly
    note: High dust loading shortens filter life dramatically; inspect monthly and replace pre-filters as
      differential pressure rises. Neglected filters cut airflow and overload coils.
    standard_ref: CIBSE Guide M; EN ISO 16890
  - task: Clean cooling coil and condensate drain pan; treat drain
    frequency: Quarterly
    note: Humid coastal air promotes biofilm and drain blockage — inspect for mould/algae.
  - task: Check fan belts, bearings, vibration; lubricate as required
    frequency: Quarterly
  - task: Verify damper actuators, control valve operation, and BMS setpoints
    frequency: Semi-annual
  - task: Inspect casing, gaskets, and acoustic lining for leaks/damage
    frequency: Annual
common_faults:
  - symptom: Low supply airflow / spaces not reaching setpoint
    likely_causes:
      - Heavily loaded/blocked filters
      - Slipping or broken fan belt
      - Closed or stuck damper
      - Dirty cooling coil
    resolution_steps:
      - Check filter differential pressure; replace filters if high
      - Inspect and re-tension or replace fan belts
      - Verify damper positions and actuator operation
      - Clean cooling coil if fouled
  - symptom: Water leaking from AHU / condensate overflow
    likely_causes:
      - Blocked condensate drain or trap
      - Dirty drain pan
      - Coil flooding due to excessive bypass
    resolution_steps:
      - Clear and flush condensate drain and trap
      - Clean and disinfect drain pan
      - Confirm correct trap height for fan static
sources:
  - https://www.cibse.org/ (CIBSE Guide M)
  - https://www.ashrae.org/technical-resources (ASHRAE Standard 62.1 ventilation)
last_reviewed: 2026-06-08
---

A unit that conditions and distributes air to occupied spaces, containing supply/return fans, cooling coils, filters, dampers, and controls. Serves chilled-water HVAC systems across offices, malls, and hospitals in the GCC.

## Region context

Dust and humidity drive the maintenance regime: frequent filter changes, vigilant coil/drain hygiene, and IAQ checks. Coastal sites also see accelerated casing corrosion — specify galvanised/coated panels.
