import { z } from "zod";
import type { ZodRawShape } from "zod";
import { RegionSchema } from "./schema.js";

/**
 * MCP Prompts — ready-made templates that orient an assistant (or a CMMS agent) to use Siyana's
 * tools well. Each returns a single user message.
 */
export interface PromptDef {
  name: string;
  description: string;
  args: ZodRawShape;
  build: (args: Record<string, string | undefined>) => string;
}

export const PROMPTS: PromptDef[] = [
  {
    name: "ppm-plan",
    description: "Draft a region-tuned, cited preventive-maintenance (PPM) plan for an asset.",
    args: {
      asset: z.string().describe("Asset type or id, e.g. 'air-cooled chiller' or 'hvac-ahu'"),
      region: RegionSchema.optional().describe("Region scope (default gcc)"),
    },
    build: (a) =>
      `Use the Siyana tools (list_asset_categories, search_assets, get_ppm_schedule) to build a preventive-maintenance (PPM) plan for "${a.asset}"${a.region ? ` in region ${a.region}` : ""}. Group the tasks by frequency, include the region-specific note and the standard each frequency is based on, call out any safety-critical steps, and cite the sources.`,
  },
  {
    name: "fault-triage",
    description: "Diagnose a fault: likely causes, step-by-step resolution, and safety notes.",
    args: {
      asset: z.string().describe("Asset type or id"),
      symptom: z.string().describe("What's happening, e.g. 'tripping on high pressure'"),
    },
    build: (a) =>
      `Use Siyana (search_assets, then get_fault_resolution) to triage this fault on "${a.asset}": "${a.symptom}". List the most likely causes first, give a step-by-step resolution, state the safety precautions, and cite the sources. Remind me to verify against the OEM manual.`,
  },
  {
    name: "spec-lookup",
    description: "Find specifications and the official manual for a piece of equipment.",
    args: {
      query: z.string().describe("Equipment, brand or model, e.g. 'Daikin VRV'"),
    },
    build: (a) =>
      `Use Siyana (search_assets, then get_asset_spec) to find the specifications and the official manufacturer manual for "${a.query}". Summarise the key specs and link the manual; note the region the data is tuned for.`,
  },
];
