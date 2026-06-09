import { parse as parseYaml } from "yaml";

/**
 * Split a Markdown file into its YAML frontmatter (machine fields) and Markdown body (the
 * human/LLM-readable narrative). Equipment knowledge is authored as `.md`: structured fields up top,
 * prose below.
 */
export interface ParsedMarkdown {
  data: Record<string, unknown>;
  body: string;
}

export function parseFrontmatter(raw: string): ParsedMarkdown {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!m) {
    // No frontmatter fence — treat the whole file as YAML (back-compat) with an empty body.
    return { data: (parseYaml(raw) as Record<string, unknown>) ?? {}, body: "" };
  }
  return { data: (parseYaml(m[1]) as Record<string, unknown>) ?? {}, body: m[2].trim() };
}
