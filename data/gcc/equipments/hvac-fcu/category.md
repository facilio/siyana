---
id: hvac-fcu
trade: hvac
asset_type: Fan Coil Unit (FCU)
aliases:
  - FCU
  - fan coil
specifications:
  - key: Airflow
    value: 200–2,000 m³/h
  - key: Coil
    value: 2-pipe or 4-pipe chilled-water
  - key: Types
    value: Ceiling-concealed ducted, cassette, exposed
  - key: Control
    value: Room thermostat + 2-way/3-way control valve
ppm:
  - task: Clean/replace return-air filter
    frequency: Monthly
    note: Dust loading is high; monthly cleaning prevents airflow loss and coil fouling.
  - task: Clean coil, drain pan, and clear condensate drain
    frequency: Quarterly
    note: Condensate drains block easily in humid zones, causing ceiling water damage.
  - task: Check fan motor, bearings, and control valve operation
    frequency: Semi-annual
  - task: Verify thermostat calibration and BMS integration
    frequency: Annual
common_faults:
  - symptom: Water staining on ceiling below FCU
    likely_causes:
      - Blocked condensate drain or trap
      - Dirty/overflowing drain pan
      - Failed condensate pump (where fitted)
    resolution_steps:
      - Flush and clear the condensate drain line and trap
      - Clean and disinfect the drain pan
      - Test the condensate pump and float switch
  - symptom: Noisy operation / poor airflow
    likely_causes:
      - Worn fan bearings
      - Loose fan or debris on impeller
      - Heavily loaded filter
    resolution_steps:
      - Replace the filter
      - Inspect and replace fan bearings; clean impeller
sources:
  - https://www.cibse.org/ (CIBSE Guide M)
last_reviewed: 2026-06-08
---

A compact terminal unit with a fan and chilled-water coil that conditions a single zone, fed from a central chilled-water plant. Ubiquitous in GCC hotels, apartments, and offices.

## Region context

In high-occupancy hotels and apartments, FCU drain blockages are a leading cause of property damage claims — make condensate hygiene the priority on every visit.
