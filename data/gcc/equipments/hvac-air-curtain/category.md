---
id: hvac-air-curtain
trade: hvac
asset_type: Air Curtain
aliases:
  - air curtain
  - air door
specifications:
  - key: Function
    value: Downward/cross air jet separating conditioned and outdoor air at entrances
  - key: Types
    value: Ambient, electric-heated, or chilled/DX
  - key: Control
    value: Door-switch / occupancy interlock; speed selection
ppm:
  - task: Clean intake grille, filter and fan barrel/impeller
    frequency: Quarterly
    note: Doorway dust loads the intake quickly and unbalances the air jet.
  - task: Check fan motor, bearings and mountings for noise/vibration
    frequency: Semi-annual
  - task: Verify door-switch interlock, speed and air-jet aim/throw
    frequency: Semi-annual
common_faults:
  - symptom: Weak or uneven air jet / hot air ingress at the door
    likely_causes:
      - Dust-loaded intake or impeller
      - Mis-aimed nozzle / wrong speed setting
      - Failed door-switch interlock (unit not running when door opens)
    resolution_steps:
      - Clean intake, filter and impeller
      - Re-aim the nozzle and set the correct speed for the opening height
      - Test the door-switch interlock and controls
  - symptom: Excessive noise or vibration
    likely_causes:
      - Worn fan bearings
      - Debris on impeller / loose mounting
    resolution_steps:
      - Replace bearings; clean and balance the impeller
      - Re-secure the mountings
sources:
  - https://www.cibse.org/ (CIBSE Guide M)
  - https://www.ashrae.org/technical-resources
last_reviewed: "2026-06-09"
---

An air curtain projects a controlled air jet across an entrance to keep hot, dusty outdoor air out of
a conditioned space. In the Gulf it directly protects entrance comfort and cooling load — so a
correctly aimed, clean, interlocked unit matters more than it looks.

## Region context

At 45 °C+ with constant door traffic, a weak or mis-aimed curtain lets a lot of heat and dust in.
Keep the intake clean and the door interlock working so it actually runs when the door opens.
