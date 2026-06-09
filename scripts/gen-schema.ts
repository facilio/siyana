import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { zodToJsonSchema } from "zod-to-json-schema";
import { AssetSchema, ModelSchema } from "../src/schema.js";

/**
 * Regenerate the JSON Schemas from the zod source of truth.
 * Run after changing src/schema.ts: `npm run gen-schema`.
 */
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "schema");
mkdirSync(outDir, { recursive: true });

for (const [name, schema, file] of [
  ["Category", AssetSchema, "category.schema.json"],
  ["Model", ModelSchema, "model.schema.json"],
] as const) {
  const jsonSchema = zodToJsonSchema(schema, { name, $refStrategy: "none" });
  const outFile = join(outDir, file);
  writeFileSync(outFile, JSON.stringify(jsonSchema, null, 2) + "\n", "utf8");
  process.stdout.write(`Wrote ${outFile}\n`);
}
