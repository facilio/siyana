---
id: plumbing-booster-pump-set
trade: plumbing
asset_type: Domestic Water Booster Pump Set
aliases:
  - booster pump
  - booster set
  - pressure boosting system
  - hydropneumatic set
specifications:
  - key: Configuration
    value: 2–4 vertical multistage pumps, duty/standby
  - key: Control
    value: VFD with pressure transducer and PLC
  - key: Vessel
    value: Diaphragm pressure vessel(s)
  - key: Material
    value: Stainless steel wetted parts
ppm:
  - task: Check operating pressure, alternation, and vessel pre-charge
    frequency: Monthly
    note: Verify pump alternation so one pump doesn't carry all hours in high-demand summer.
  - task: Inspect for leaks, check mechanical seals and pump noise/vibration
    frequency: Quarterly
  - task: Test pressure transducer calibration and VFD parameters
    frequency: Semi-annual
  - task: Inspect/replace diaphragm vessel; clean strainers; check NRVs
    frequency: Annual
    note: Hard water scales valves and seals — descale strainers and check non-return valves.
common_faults:
  - symptom: Pumps short-cycling (rapid start/stop)
    likely_causes:
      - Lost/low pressure-vessel pre-charge or ruptured diaphragm
      - Leaking non-return valve
      - Pressure transducer/setpoint issue
    resolution_steps:
      - Check and re-charge the vessel pre-charge (≈90% of cut-in pressure) or replace diaphragm
      - Inspect and reseat/replace leaking non-return valves
      - Verify transducer reading and controller setpoints
  - symptom: Low or fluctuating water pressure to apartments
    likely_causes:
      - Clogged suction strainer
      - VFD/control fault keeping pumps at low speed
      - Air in system or low tank level
    resolution_steps:
      - Clean suction strainers
      - Check VFD operation and fault log
      - Verify tank level and bleed air from the system
sources:
  - https://www.grundfos.com/products/find-product/hydro-mpc
  - https://wilo.com/
last_reviewed: 2026-06-08
---

A multi-pump set with controls and a pressure/diaphragm vessel that maintains domestic water pressure from storage tanks to upper floors. Standard in GCC towers and villas, typically variable-speed (VFD) controlled with duty/assist/standby pumps.

## Region context

High summer demand and hard, scaling water are the main stressors. Scale on valves and seals plus continuous duty in peak months make pump alternation, descaling, and seal checks priorities.
