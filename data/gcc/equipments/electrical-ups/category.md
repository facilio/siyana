---
id: electrical-ups
trade: electrical
asset_type: UPS System
aliases:
  - UPS
  - uninterruptible power supply
specifications:
  - key: Topology
    value: Online double-conversion (typical for critical loads)
  - key: Rating
    value: 1–800 kVA
  - key: Battery
    value: VRLA or Li-ion strings
  - key: Runtime
    value: Application-dependent (minutes to >1 hour)
ppm:
  - task: Check status/alarms, input/output parameters, and environment temperature
    frequency: Monthly
    note: Battery life halves for roughly every 8–10 °C above 25 °C — verify battery-room cooling is working; GCC
      ambient is a major cause of premature battery failure.
  - task: Battery inspection — terminal torque, impedance/ohmic test, visual for swelling/leaks
    frequency: Quarterly
  - task: Functional transfer test (mains-to-battery) and bypass test
    frequency: Semi-annual
  - task: Capacity/discharge test of battery strings
    frequency: Annual
  - task: Clean filters/fans, verify firmware and capacitor condition
    frequency: Annual
common_faults:
  - symptom: UPS on bypass / battery fault alarm
    likely_causes:
      - End-of-life or failed battery block raising string impedance
      - High battery-room temperature degrading cells
      - Charger fault
    resolution_steps:
      - Run battery impedance test to identify the weak block
      - Replace failed blocks (ideally full string if aged)
      - Verify and restore battery-room cooling/setpoint
    safety_notes: Battery banks store lethal energy and DC current; use insulated tools and PPE, observe polarity,
      and follow safe isolation procedures.
  - symptom: UPS overheating / fan alarm
    likely_causes:
      - Dust-clogged air filters or failed cooling fan
      - Inadequate room cooling
    resolution_steps:
      - Clean/replace air filters and test fans
      - Verify room cooling capacity against UPS heat output
sources:
  - https://www.ieee.org/ (IEEE 1188 — VRLA battery maintenance practice)
  - https://www.apc.com/ (APC by Schneider Electric UPS documentation)
last_reviewed: 2026-06-08
---

Provides conditioned, uninterrupted power to critical loads during mains disturbances and bridges the gap until generator pickup. Protects data centres, BMS, fire/life-safety, and security systems in GCC facilities.

## Region context

Heat is the dominant battery killer in the Gulf. Treat battery-room cooling as critical, test capacity annually, and budget for shorter battery replacement cycles than temperate climates.
