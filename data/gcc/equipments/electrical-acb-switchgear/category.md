---
id: electrical-acb-switchgear
trade: electrical
asset_type: LV Switchgear & Air Circuit Breaker (ACB)
aliases:
  - ACB
  - air circuit breaker
  - main LV panel
  - LV switchgear
specifications:
  - key: Voltage
    value: 400/230 V, 50 Hz
  - key: ACB rating
    value: 630–6,300 A
  - key: Breaking capacity
    value: 50–100 kA (Icu)
  - key: Protection
    value: Microprocessor trip unit (LSIG)
ppm:
  - task: Thermographic survey of busbars and ACB terminations under load
    frequency: Annual
  - task: Operate/rack ACBs, check charging mechanism, contacts, and arc chutes
    frequency: Annual
    standard_ref: IEC 61439 / IEC 60947-2
  - task: Secondary-injection test of trip units; verify settings against discrimination study
    frequency: Annual
  - task: Clean busbars/compartments, check IP and bolted-joint torque
    frequency: Annual
common_faults:
  - symptom: ACB fails to close or trips on closing
    likely_causes:
      - Discharged closing spring / charging motor fault
      - Trip unit fault or interlock not satisfied
      - Worn main contacts
    resolution_steps:
      - Check spring-charge mechanism and charging motor
      - Verify interlocks and trip-unit health/settings
      - Inspect main contacts and arc chutes for wear/erosion
    safety_notes: Live LV switchboards carry severe arc-flash risk. Authorised persons only, with arc-rated PPE,
      safe isolation, and racking-out where practical.
  - symptom: Overheating busbar joints (thermography hotspot)
    likely_causes:
      - Loose bolted joint
      - Oxidised/contaminated contact surface
      - Overload
    resolution_steps:
      - Isolate, clean and re-torque joints to specification
      - Re-survey under load to confirm rectification
sources:
  - https://webstore.iec.ch/ (IEC 61439, IEC 60947-2)
last_reviewed: 2026-06-08
---

The main low-voltage switchboard incorporating air circuit breakers (ACBs) and metering that controls and protects the incoming supply and major distribution. The heart of a GCC building's LV distribution, downstream of the transformer.

## Region context

High ambient temperatures and dust ingress raise joint temperatures and arc-flash consequences. Annual thermography plus disciplined torque checks are the highest-value tasks.
