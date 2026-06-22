---
id: fire-smoke-ventilation
trade: fire
asset_type: Smoke Control / Ventilation
aliases:
  - smoke ventilation
  - stairwell pressurisation
  - car-park smoke extract
  - jet fans
specifications:
  - key: Systems
    value: Stairwell/lobby pressurisation, car-park smoke extract (incl. jet/impulse fans), atrium extract
  - key: Function
    value: Keeps escape routes tenable and clears smoke on a fire signal
  - key: Integration
    value: Driven by the fire-alarm cause-and-effect; dedicated fans, dampers, controls
ppm:
  - task: Functional test — fans, dampers and controls run in the correct fire mode on alarm
    frequency: Semi-annual
    note: Verify the real cause-and-effect from the fire panel, not just a local fan start.
    standard_ref: Local fire & life-safety code; smoke-control commissioning data
  - task: Check pressurisation set-points and escape-door opening forces
    frequency: Annual
    note: Over/under-pressure both fail the design — doors must still open against the pressure.
  - task: Inspect fans, jet/impulse fans, motorised dampers, belts and bearings
    frequency: Semi-annual
  - task: Verify standby power changeover for the smoke-control system
    frequency: Annual
common_faults:
  - symptom: System fails to run in fire mode on an alarm
    likely_causes:
      - Cause-and-effect interface fault with the fire panel
      - Failed fan, actuator or motorised damper
      - Control/relay failure
    resolution_steps:
      - Test the fire-panel interface and cause-and-effect mapping
      - Service/replace the affected fan, actuator or damper
      - Check control relays and wiring
    safety_notes: >-
      Life-safety system — coordinate testing with the fire-alarm contractor and civil-defence authority,
      maintain a fire watch while impaired, and restore/verify after work. Isolate power before fan/actuator work.
  - symptom: Stairwell doors hard to open / poor smoke clearance
    likely_causes:
      - Pressurisation set too high (doors) or too low (smoke ingress)
      - Leakage paths or relief damper fault
    resolution_steps:
      - Re-balance pressurisation to design; verify door-opening force
      - Inspect relief dampers and seal leakage paths
sources:
  - https://www.nfpa.org/ (NFPA 92 — smoke control systems)
  - "Local civil-defence fire & life-safety code (e.g. UAE Fire and Life Safety Code)"
last_reviewed: "2026-06-09"
---

Smoke control — stairwell/lobby pressurisation, car-park smoke extract (often jet/impulse fans) and
atrium extract — keeps escape routes tenable and clears smoke when the fire system calls for it.
Maintenance centres on proving the cause-and-effect actually drives the right fans and dampers, and
that pressurisation still lets escape doors open.

## Region context

Large GCC basements/car parks and high-rise towers lean heavily on jet-fan smoke extract and
stairwell pressurisation; civil-defence sign-off and documented periodic testing are mandatory.
