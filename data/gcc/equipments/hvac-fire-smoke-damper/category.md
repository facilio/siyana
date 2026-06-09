---
id: hvac-fire-smoke-damper
trade: hvac
asset_type: Fire & Smoke Damper
aliases:
  - fire damper
  - smoke damper
  - combination fire/smoke damper
  - FSD
specifications:
  - key: Types
    value: Fire (UL 555), smoke (UL 555S), or combination fire/smoke
  - key: Actuation
    value: Fusible link (fire) or electric/pneumatic actuator (smoke/combination)
  - key: Integration
    value: Driven by the fire alarm / fire command on a smoke event
  - key: Compliance
    value: Listed and installed per local civil-defence fire & life-safety code
ppm:
  - task: Operational drop / close test of each damper (and reset)
    frequency: Per code (commonly 1 year after install, then per local code interval)
    note: GCC civil-defence codes mandate periodic testing and documented records — align the schedule to the
      local authority's requirement.
    standard_ref: Local fire & life-safety code (e.g. UAE Fire and Life Safety Code); NFPA 80 / 105 basis
  - task: Inspect fusible link, actuator, springs and linkage; confirm full closure
    frequency: Per test cycle
  - task: Verify interlock with the fire-alarm / fire command (smoke & combination dampers)
    frequency: Per test cycle
    note: Confirm the damper actually drives closed on a real alarm signal, not just at the panel.
  - task: Check access doors/panels and that dampers remain accessible for testing
    frequency: Annual
common_faults:
  - symptom: Damper fails to close on command / fire signal
    likely_causes:
      - Seized blades or corroded linkage
      - Failed or disconnected actuator
      - Fusible link painted over / obstructed
    resolution_steps:
      - Isolate, free and lubricate the linkage; confirm full blade closure
      - Test/replace the actuator and its control wiring
      - Replace a compromised fusible link; clear obstructions
    safety_notes: Life-safety device — coordinate all testing with the fire-alarm contractor and the local
      civil-defence authority, isolate associated systems safely, and restore/verify the damper to normal
      after every test. Keep documented test records.
  - symptom: Damper not accessible for mandated testing
    likely_causes:
      - Access panel missing or blocked by later fit-out
      - Damper concealed above inaccessible ceiling
    resolution_steps:
      - Install/restore a compliant access panel
      - Record and escalate access defects for rectification
sources:
  - https://www.nfpa.org/ (NFPA 80 / NFPA 105 — damper inspection & testing basis)
  - Local civil-defence fire & life-safety codes (e.g. UAE Fire and Life Safety Code)
last_reviewed: 2026-06-08
---

A life-safety device in ductwork or wall/floor penetrations that closes to block the spread of fire and/or smoke between compartments. Fire dampers use a fusible link or motorised actuator; smoke and combination dampers are actuator-driven and interlinked with the fire-alarm system. Mandatory and inspected under GCC civil-defence fire codes.

## Region context

These are compliance-driven, life-safety assets: in the GCC the civil-defence authority mandates periodic, documented testing. The recurring real-world problems are access (lost behind fit-out) and seized/painted linkages — both are about disciplined, recorded inspection rather than climate.
