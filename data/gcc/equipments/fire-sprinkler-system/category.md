---
id: fire-sprinkler-system
trade: fire
asset_type: Fire Sprinkler System
aliases:
  - sprinkler system
  - wet riser
  - automatic sprinklers
specifications:
  - key: Types
    value: Wet-pipe (common in GCC), dry-pipe, pre-action, deluge
  - key: Components
    value: Sprinkler heads, risers, control/alarm valves, flow & tamper switches
  - key: Standard basis
    value: Designed/installed per NFPA 13; tested per NFPA 25 and local code
ppm:
  - task: Test water-flow and tamper (valve-supervisory) switches to the fire panel
    frequency: Quarterly
    note: Confirms the panel actually receives flow/isolation signals.
    standard_ref: NFPA 25
  - task: Inspect control/alarm valves, gauges and that all valves are locked open
    frequency: Monthly
  - task: Visually inspect sprinkler heads for damage, paint, corrosion and clearances
    frequency: Annual
    note: Painted/obstructed heads are a common defect; dusty stores can foul heads.
    standard_ref: NFPA 25
  - task: Main drain test (system pressure/supply check)
    frequency: Annual
common_faults:
  - symptom: No alarm at the panel when flow is simulated
    likely_causes:
      - Failed/disconnected flow switch
      - Wiring fault to the fire-alarm panel
    resolution_steps:
      - Test and replace the flow switch
      - Verify wiring and the panel input/zone
    safety_notes: >-
      Life-safety system — notify the fire-alarm contractor and authority before isolating, maintain a
      fire watch while impaired, and restore/verify after testing. Keep documented records.
  - symptom: Sprinkler head defects (painted, corroded, obstructed, leaking)
    likely_causes:
      - Painting/fit-out works
      - Corrosion or physical damage
      - Stock/partitions obstructing spray
    resolution_steps:
      - Replace affected heads (never paint or clean with solvents)
      - Restore the required clearance below heads
sources:
  - https://www.nfpa.org/ (NFPA 13 design; NFPA 25 inspection, testing & maintenance)
  - "Local civil-defence fire & life-safety code (e.g. UAE Fire and Life Safety Code)"
last_reviewed: "2026-06-09"
---

An automatic sprinkler system detects and controls fire by discharging water from heat-activated
heads, signalling the fire-alarm panel via flow switches. It's a code-mandated life-safety system;
maintenance is about proving the signalling works and keeping heads and valves in serviceable order.

## Region context

GCC civil-defence authorities require documented periodic testing. The recurring real-world defects
are painted/obstructed heads from fit-out works and valves left throttled — both caught by disciplined,
recorded inspection.
