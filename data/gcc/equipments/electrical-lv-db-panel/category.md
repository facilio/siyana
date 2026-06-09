---
id: electrical-lv-db-panel
trade: electrical
asset_type: LV Distribution Board
aliases:
  - DB
  - distribution board
  - LV panel
  - MDB
  - SMDB
specifications:
  - key: Voltage
    value: 400/230 V, 50 Hz
  - key: Protective devices
    value: MCB / MCCB / RCBO / RCD
  - key: Ingress protection
    value: IP4X–IP54 (location-dependent)
  - key: Form
    value: Form 1–4 separation (per IEC 61439)
ppm:
  - task: Thermographic (infrared) survey of busbars, terminations, and breakers
    frequency: Annual
    note: High ambient temperatures reduce conductor/breaker headroom — loose hot joints fail faster. Thermography
      under load catches them before failure.
    standard_ref: IEC 61439; local regulation (e.g. DEWA / SEWA / DM)
  - task: Tighten/torque-check terminations to specified values
    frequency: Annual
  - task: Test RCDs/RCBOs (trip time and current) and operate breakers
    frequency: Annual
    standard_ref: IEC 60364 periodic inspection
  - task: Clean enclosure interior, check gland plates and IP integrity
    frequency: Annual
  - task: Verify labelling, schedules, and that spare ways are correctly capped
    frequency: Annual
common_faults:
  - symptom: Breaker or termination overheating / discoloration / burning smell
    likely_causes:
      - Loose termination (high-resistance joint)
      - Overloaded circuit
      - Undersized/aged breaker for the load
    resolution_steps:
      - De-energise and lock off the affected section
      - Inspect for heat damage; re-terminate and torque to specification
      - Verify circuit loading against breaker/cable rating
      - Re-survey under load with thermal camera after repair
    safety_notes: Only competent/authorised persons may work on live distribution. Follow lockout/tagout and local
      electrical safety regulations; use appropriate PPE and test-before-touch.
  - symptom: Nuisance RCD/RCBO tripping
    likely_causes:
      - Cumulative earth leakage across multiple circuits
      - Moisture ingress in damp/coastal locations
      - Faulty appliance or cable insulation
    resolution_steps:
      - Split circuits to isolate the leakage source
      - Insulation-resistance test suspect circuits
      - Address moisture ingress and restore IP rating
sources:
  - https://webstore.iec.ch/ (IEC 61439, IEC 60364)
  - https://www.dewa.gov.ae/ (DEWA regulations for electrical installations)
last_reviewed: 2026-06-08
---

A low-voltage enclosure housing protective devices (MCBs, MCCBs, RCDs) that distribute and protect final circuits from a main or sub-main supply. Found at every level of GCC building electrical distribution, from main DBs to floor sub-boards.

## Region context

Heat and dust are the enemies: derate for high ambient, keep enclosures sealed against dust, and prioritise annual thermography. Coastal humidity raises earth-leakage and corrosion issues.
