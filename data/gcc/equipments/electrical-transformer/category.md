---
id: electrical-transformer
trade: electrical
asset_type: Distribution Transformer
aliases:
  - transformer
  - dry-type transformer
  - oil-filled transformer
  - package substation
specifications:
  - key: Type
    value: Dry-type (cast resin) or oil-immersed
  - key: Ratio
    value: 11 kV / 415 V typical
  - key: Rating
    value: 500–2,500 kVA
  - key: Cooling
    value: AN/AF (dry) or ONAN (oil)
ppm:
  - task: Thermographic survey of LV/MV terminations and check loading/temperature alarms
    frequency: Annual
    note: High ambient reduces thermal headroom; monitor winding/top-oil temperatures closely.
  - task: Clean (dry-type windings/ventilation) or oil sampling & DGA (oil-type)
    frequency: Annual
    note: Dust insulates dry-type windings and raises temperature — keep ventilation clear.
  - task: Check ventilation/cooling fans, bushings, gaskets, and tap-changer position
    frequency: Annual
  - task: Test protection (Buchholz/temperature relays where fitted) and earthing
    frequency: Annual
    standard_ref: IEC 60076; local utility regulations
common_faults:
  - symptom: High winding/top-oil temperature alarm
    likely_causes:
      - Overload
      - Blocked ventilation / failed cooling fan (dry-type)
      - Low oil level or degraded oil (oil-type)
      - Dust accumulation on windings
    resolution_steps:
      - Check loading against rating and rebalance if overloaded
      - Clear ventilation paths, clean windings, verify cooling fans
      - Check oil level/condition; sample for DGA on oil units
    safety_notes: MV work is restricted to authorised/competent persons with utility coordination, safe isolation,
      earthing, and permit-to-work.
  - symptom: Buzzing/abnormal noise or partial-discharge indication
    likely_causes:
      - Loose core/winding clamping
      - Insulation degradation / contamination on resin surfaces
    resolution_steps:
      - Isolate and arrange specialist inspection/testing
      - Clean resin surfaces; tighten clamping per OEM guidance
sources:
  - https://webstore.iec.ch/ (IEC 60076 — power transformers)
  - https://www.dewa.gov.ae/ (utility substation requirements)
last_reviewed: 2026-06-08
---

Steps medium voltage (e.g. 11 kV) down to low voltage (400/230 V) for building distribution. In GCC developments commonly dry-type (cast resin) indoors or oil-filled in package substations, often owned/operated under the local utility's rules.

## Region context

Dust on dry-type windings and high ambient temperatures push transformers toward their thermal limits. Keep substation ventilation and AC functional, and watch temperature trends in summer.
