---
id: hvac-chilled-beam
trade: hvac
asset_type: Chilled Beam
aliases:
  - chilled beam
  - active chilled beam
  - passive chilled beam
specifications:
  - key: Type
    value: Active (with primary-air induction) or passive
  - key: Chilled water
    value: Above-dewpoint supply (typically 14–16 °C) to avoid condensation
  - key: Application
    value: Offices, hospitals — quiet, draught-free sensible cooling
ppm:
  - task: Inspect coil/fins and induction nozzles; vacuum dust
    frequency: Semi-annual
    note: Dust on fins and nozzles cuts induction and capacity — a real issue in Gulf interiors.
  - task: Check chilled-water valve and confirm supply temperature stays above room dewpoint
    frequency: Quarterly
    note: Condensation risk is the No.1 chilled-beam failure in humid GCC buildings.
    standard_ref: CIBSE Guide M; manufacturer commissioning data
  - task: Verify primary-air flow and balance (active beams)
    frequency: Annual
common_faults:
  - symptom: Condensation / dripping from the beam
    likely_causes:
      - Chilled-water temperature below room dewpoint
      - High space humidity / fresh air not dehumidified upstream
      - Failed condensation/dewpoint controller
    resolution_steps:
      - Verify chilled-water supply is above dewpoint; raise the setpoint if needed
      - Confirm the FAHU is dehumidifying outdoor air to the design dewpoint
      - Test the condensation sensor / dewpoint control
  - symptom: Insufficient cooling in the zone
    likely_causes:
      - Dust-fouled coil/nozzles
      - Low primary-air flow (active beam)
      - Chilled-water valve stuck
    resolution_steps:
      - Clean the coil and induction nozzles
      - Check and balance primary-air flow
      - Service the control valve
sources:
  - https://www.cibse.org/ (CIBSE Guide M; chilled beams application)
  - https://www.ashrae.org/technical-resources
last_reviewed: "2026-06-09"
---

A chilled beam delivers quiet, draught-free sensible cooling by inducing room air over a
chilled-water coil. In the humid Gulf the make-or-break is keeping chilled water above the room
dewpoint and the fresh air properly dehumidified — otherwise beams sweat. Dust fouling of fins and
nozzles is the other recurring local issue.

## Region context

High outdoor humidity makes condensation control critical: pair chilled beams with a FAHU that
reaches the design dewpoint, and keep the chilled-water supply temperature above the space dewpoint.
