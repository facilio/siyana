---
id: hvac-precision-cooling
trade: hvac
asset_type: Precision / In-Row Cooling (CRAC / CRAH)
aliases:
  - precision cooling
  - CRAC
  - CRAH
  - in-row cooling
  - data centre cooling
specifications:
  - key: Type
    value: DX (CRAC) or chilled-water (CRAH); room or in-row
  - key: Control
    value: Close-control temperature & humidity, high sensible heat ratio
  - key: Resilience
    value: N+1 / 2N redundancy, BMS/DCIM monitored
  - key: Envelope
    value: Operated to ASHRAE TC9.9 thermal guidelines
ppm:
  - task: Inspect / replace air filters
    frequency: Monthly
    note: Precision units are very airflow- and cleanliness-sensitive; GCC dust shortens filter life.
  - task: Descale and service humidifier; check humidity control
    frequency: Quarterly
    note: Hard Gulf water scales steam/infrared humidifiers quickly — descale to keep RH control stable.
  - task: Clean coils, clear condensate, test leak-detection
    frequency: Quarterly
  - task: Check compressors/economiser, refrigerant or chilled-water flow, fan/EC motors
    frequency: Semi-annual
  - task: Verify N+1 changeover, calibrate temperature/RH sensors, test BMS/DCIM alarms
    frequency: Semi-annual
    note: Test redundancy failover — a single unit loss must not take the room out of the ASHRAE envelope.
    standard_ref: ASHRAE TC9.9 thermal guidelines
common_faults:
  - symptom: Rising room temperature / loss of cooling
    likely_causes:
      - Clogged filters or fouled coil restricting airflow
      - Compressor / chilled-water flow fault
      - Redundant unit failed to stage in
    resolution_steps:
      - Check and replace filters; inspect coil
      - Verify refrigerant or chilled-water flow and compressor operation
      - Confirm N+1 changeover and alarm escalation worked
    safety_notes: Coordinate any intervention with IT/critical-operations; isolate electrically and follow
      lockout/tagout. Refrigerant work by certified technicians.
  - symptom: Humidity out of band / units fighting
    likely_causes:
      - Scaled or failed humidifier
      - Adjacent units with conflicting humidity setpoints
    resolution_steps:
      - Descale/service humidifier; verify control
      - Align setpoints and deadbands across units (teamwork/group control)
  - symptom: Water-leak alarm under floor / in row
    likely_causes:
      - Blocked condensate or humidifier drain
      - Chilled-water connection leak
    resolution_steps:
      - Clear drains; locate and repair leak
      - Test the leak-detection system
sources:
  - https://www.ashrae.org/technical-resources (ASHRAE TC9.9 datacom thermal guidelines)
  - https://www.cibse.org/ (CIBSE Guide M)
last_reviewed: 2026-06-08
---

Close-control air conditioning for data centres, server and telecom rooms — tight temperature and humidity control with high sensible capacity and redundancy. Deployed as room units (CRAC/CRAH) or in-row units between server racks. Critical, 24/7 assets across GCC IT and telecom facilities.

## Region context

In the Gulf, dust and hard water are the two enemies of close-control units — they hammer filters and humidifiers, the two things keeping a data hall inside the ASHRAE envelope. Redundancy testing is non-negotiable because these rooms run 24/7.
