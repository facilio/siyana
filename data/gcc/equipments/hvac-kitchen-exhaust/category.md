---
id: hvac-kitchen-exhaust
trade: hvac
asset_type: Kitchen Exhaust / Ecology Unit
aliases:
  - kitchen exhaust
  - ecology unit
  - kitchen extract
  - grease exhaust
specifications:
  - key: Function
    value: Extracts grease-laden kitchen air; ecology unit removes grease/smoke/odour before discharge
  - key: Stages
    value: Baffle/grease filters → ESP / multi-stage filtration → optional carbon (odour)
  - key: Application
    value: Commercial kitchens, food courts, hotels
ppm:
  - task: Clean/replace grease baffle filters
    frequency: Monthly
    note: Heavy grease loads are a major fire risk — frequent cleaning is non-negotiable.
    standard_ref: Local fire & life-safety code; kitchen-ventilation best practice
  - task: Clean ESP cells / replace filtration media in the ecology unit
    frequency: Quarterly
  - task: Degrease ductwork and check access doors
    frequency: Semi-annual
    note: Grease build-up in ducts is a leading cause of commercial-kitchen fires.
  - task: Inspect exhaust fan, belts/bearings and check airflow/extract rate
    frequency: Semi-annual
common_faults:
  - symptom: Smoke/odour escaping into the kitchen or complaints from neighbours
    likely_causes:
      - Loaded grease filters or fouled ESP cells
      - Low extract airflow (fan/belt issue)
      - Spent carbon (odour) media
    resolution_steps:
      - Clean/replace grease filters and ESP cells
      - Service the exhaust fan and verify extract airflow
      - Replace carbon media for odour control
  - symptom: ESP tripping / not energising
    likely_causes:
      - Heavy grease shorting the cells
      - Failed HV power pack or interlock
    resolution_steps:
      - Deep-clean or replace ESP cells
      - Test the HV power pack and door interlocks
    safety_notes: ESP cells carry high voltage; isolate, lockout/tagout and confirm safe-discharge before opening.
sources:
  - https://www.cibse.org/ (CIBSE Guide M; kitchen ventilation)
  - "Local fire & life-safety code (e.g. UAE Fire and Life Safety Code) — kitchen extract"
last_reviewed: "2026-06-09"
---

A kitchen exhaust system extracts grease-laden air; an ecology unit cleans grease, smoke and odour
before discharge. It's as much a fire-safety asset as an HVAC one — grease in filters and ducts is a
primary commercial-kitchen fire cause, so cleaning frequency is the priority.

## Region context

Dense food-court and hotel kitchens across the GCC, plus close neighbours, make odour control and
disciplined grease cleaning (filters + duct) both a fire-safety and a nuisance-complaint issue.
