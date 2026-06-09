---
id: plumbing-submersible-drainage-pump
trade: plumbing
asset_type: Submersible Drainage / Sewage Pump
aliases:
  - submersible pump
  - sump pump
  - sewage pump
  - drainage pump
specifications:
  - key: Type
    value: Submersible centrifugal (vortex/channel/grinder impeller)
  - key: Control
    value: Float switches or level transducer, duty/standby alternation
  - key: Discharge
    value: Guide-rail auto-coupling with non-return and isolation valves
  - key: Material
    value: Cast iron / stainless, mechanical seals
ppm:
  - task: Test float/level controls, alternation, and high-level alarm
    frequency: Monthly
  - task: Inspect for blockage (rag/grease), check run currents and seal-leak sensor
    frequency: Quarterly
    note: Grease and wipes ("fatberg") blockages are common — clean impeller and wet well.
  - task: Clean wet well/sump, check guide rails, lifting chains, and NRVs
    frequency: Semi-annual
  - task: Pull pumps for inspection — seal/oil check, impeller wear, insulation test
    frequency: Annual
common_faults:
  - symptom: Pump runs but does not pump / low flow
    likely_causes:
      - Blocked impeller or discharge (rags, grease, debris)
      - Closed isolation valve or stuck non-return valve
      - Worn impeller
    resolution_steps:
      - Isolate and lift pump; clear impeller and volute of debris
      - Verify valve line-up and free non-return valve
      - Assess impeller wear and replace if needed
    safety_notes: Confined-space and biohazard risk in sewage wet wells. Follow confined-space entry permits, gas
      testing, and hygiene/PPE procedures; isolate electrically before lifting.
  - symptom: High-level alarm / well flooding
    likely_causes:
      - Both pumps blocked or tripped
      - Failed level controls
      - Inflow exceeding pump capacity
    resolution_steps:
      - Check pump trip status and reset after clearing faults
      - Test and recalibrate level controls/floats
      - Confirm pump capacity vs. inflow; investigate infiltration
sources:
  - https://www.grundfos.com/products/find-product/sl-and-se-pumps
  - https://www.cibse.org/ (CIBSE Guide M — drainage maintenance)
last_reviewed: 2026-06-08
---

A submersible pump installed in a wet well or sump to lift drainage, stormwater, or sewage to a higher discharge point. Common in GCC basements, car parks, and pump stations, often arranged duty/standby with level controls.

## Region context

Basement and car-park sumps see heavy silt/sand wash-in plus grease loading. Frequent control testing and wet-well cleaning prevent floods; alternation avoids one pump bearing all wear.
