---
id: fire-alarm-panel
trade: fire
asset_type: Fire Alarm Control Panel
aliases:
  - fire alarm panel
  - FACP
  - addressable fire alarm
  - fire detection
specifications:
  - key: Type
    value: Addressable or conventional fire-alarm control panel
  - key: Field devices
    value: Smoke/heat detectors, call points, sounders, beacons, interfaces
  - key: Resilience
    value: Mains + standby batteries; monitored circuits
ppm:
  - task: Visual check of panel status, faults/disablements, and battery condition
    frequency: Monthly
    note: A panel left with disabled zones is a common, dangerous defect — log and clear.
  - task: Test a sample of detectors and call points; verify sounders/beacons and cause-and-effect
    frequency: Quarterly
    note: Rotate so all devices are tested across the year; confirm interfaces (dampers, lifts, AHUs).
    standard_ref: Local fire & life-safety code; BS 5839 / NFPA 72 basis
  - task: Battery load/capacity test and standby autonomy check
    frequency: Annual
    note: GCC plant-room heat shortens battery life — test capacity, not just presence.
  - task: Functional test of every device and full cause-and-effect
    frequency: Annual
    standard_ref: NFPA 72 / BS 5839
common_faults:
  - symptom: Recurring false alarms from a zone/detector
    likely_causes:
      - Dust-contaminated smoke detectors
      - Humidity/condensation on a device
      - Faulty detector or loop wiring
    resolution_steps:
      - Clean or replace contaminated detectors
      - Check siting vs. humidity/airflow; address moisture
      - Test the loop and replace faulty devices
  - symptom: Panel battery / supply fault
    likely_causes:
      - End-of-life or heat-degraded standby batteries
      - Charger fault
    resolution_steps:
      - Capacity-test and replace batteries
      - Verify the charger and supervised supply
    safety_notes: >-
      Life-safety system — coordinate any detector disablement with the authority and a fire watch, and
      re-enable/verify after work. Isolate safely before battery work; observe DC polarity.
sources:
  - https://www.nfpa.org/ (NFPA 72 — fire alarm & signaling)
  - "Local civil-defence fire & life-safety code (e.g. UAE Fire and Life Safety Code)"
last_reviewed: "2026-06-09"
---

The fire-alarm control panel is the brain of detection and alarm — monitoring detectors and call
points, driving sounders/beacons, and triggering cause-and-effect (dampers, AHUs, lifts). Maintenance
is about proving devices and cause-and-effect work, keeping standby batteries healthy, and clearing
disablements promptly.

## Region context

Plant-room heat shortens standby-battery life (capacity-test, don't just check presence), and dust
plus humidity drive false alarms — detector cleaning and correct siting are recurring GCC tasks.
