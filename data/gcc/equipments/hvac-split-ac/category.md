---
id: hvac-split-ac
trade: hvac
asset_type: Split Air Conditioner
aliases:
  - split unit
  - split AC
  - mini split
  - wall-mounted AC
specifications:
  - key: Capacity
    value: 1–5 TR (12,000–60,000 BTU/h)
  - key: Refrigerant
    value: R-410A / R-32
  - key: Types
    value: Wall-mounted, ducted, cassette, floor-standing
  - key: Efficiency
    value: Inverter or fixed-speed
ppm:
  - task: Clean/replace indoor filters
    frequency: Monthly
    note: Dust-heavy environment; monthly cleaning prevents coil icing and airflow loss.
  - task: Clean indoor evaporator coil and clear condensate drain
    frequency: Quarterly
    note: Drain blockages cause ceiling water damage — flush drains every visit.
  - task: Clean outdoor condenser coil and check fan
    frequency: Quarterly
    note: Sand fouling reduces capacity and raises running cost.
  - task: Check refrigerant charge and electrical connections
    frequency: Annual
common_faults:
  - symptom: Unit running but not cooling
    likely_causes:
      - Dirty filters / frozen evaporator coil
      - Low refrigerant charge (leak)
      - Failed capacitor or compressor
    resolution_steps:
      - Clean filters and allow any ice to melt; restart and observe
      - Check refrigerant pressures; leak-test and repair if low
      - Test compressor capacitor and contactor
    safety_notes: Isolate power before electrical checks; recover refrigerant per regulations.
  - symptom: Water dripping from indoor unit
    likely_causes:
      - Blocked condensate drain
      - Dirty coil causing carry-over
      - Incorrect drain slope
    resolution_steps:
      - Flush and clear the condensate drain line
      - Clean the evaporator coil
      - Verify drain pipe fall to discharge
sources:
  - https://www.daikin.com/products/ac
  - https://www.cibse.org/ (CIBSE Guide M)
last_reviewed: 2026-06-08
---

A two-part direct-expansion air conditioner with an indoor evaporator unit and an outdoor condensing unit connected by refrigerant piping. The most common cooling unit in GCC apartments, small offices, and shops.

## Region context

Sheer volume of units plus dust means filter and drain hygiene drive most callouts. Outdoor units on sun-exposed walls run hot — keep condensers clean and shaded where possible.
