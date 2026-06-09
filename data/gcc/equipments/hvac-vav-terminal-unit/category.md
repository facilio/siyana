---
id: hvac-vav-terminal-unit
trade: hvac
asset_type: VAV Terminal Unit
aliases:
  - VAV box
  - variable air volume terminal
  - VAV terminal
specifications:
  - key: Type
    value: Single-duct, fan-powered, or dual-duct; pressure-independent
  - key: Control
    value: Airflow sensor + damper actuator, DDC/BMS controlled
  - key: Airflow
    value: Sized per zone; enforces min ventilation airflow
  - key: Reheat
    value: Optional (rare in cooling-only GCC zones)
ppm:
  - task: Verify damper actuator stroke and airflow sensor response
    frequency: Semi-annual
  - task: Recalibrate min/max airflow setpoints against the BMS
    frequency: Annual
    note: Recalibrate after any AHU static or BMS change so minimum ventilation airflow is still met.
    standard_ref: ASHRAE 62.1 (ventilation)
  - task: Check inlet flow sensor / pitot for dust blockage; clean as needed
    frequency: Annual
    note: Fine dust can foul the flow sensor and skew airflow control.
  - task: Inspect reheat valve/coil where fitted; check controller and wiring
    frequency: Annual
common_faults:
  - symptom: Zone won't hold temperature setpoint
    likely_causes:
      - Stuck/failed damper actuator
      - Faulty or fouled airflow sensor
      - Min/max airflow mis-set
    resolution_steps:
      - Command the damper through its stroke; replace actuator if it won't track
      - Clean/verify the inlet airflow sensor
      - Re-check min/max airflow setpoints against design
  - symptom: Whistling / excess noise at the diffusers
    likely_causes:
      - Excessive inlet static / undersized box for flow
      - Damper hunting from unstable control
    resolution_steps:
      - Verify upstream static and balancing
      - Tune the controller loop to stop hunting
sources:
  - https://www.ashrae.org/technical-resources (ASHRAE 62.1)
  - https://www.cibse.org/ (CIBSE Guide M)
last_reviewed: 2026-06-08
---

A zone-level box that modulates supply airflow (and sometimes reheat) to hold a space at setpoint, fed from a central AHU. Widely used in GCC offices and mixed-use towers for zoning and part-load efficiency.

## Region context

In high-occupancy Gulf offices, the critical task is keeping each box's minimum airflow honest so ventilation isn't starved at part load — recalibrate after any AHU or BMS change, and keep flow sensors clear of dust.
