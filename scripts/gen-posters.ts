// Generate 20 LinkedIn poster SVGs (1080x1080) in the Siyana desert-dusk style.
// Output: site/public/posters/poster-NN.svg + site/src/lib/posters.json (gallery manifest).
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const C = {
  ink: "#0E1116", ink2: "#141A22", sand: "#E7D8B4", dune: "#E0A458",
  duneBright: "#F2B86E", ember: "#D2693C", teal: "#5EC8C2", text: "#E7EBF0", muted: "#9AA6B3",
};
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

interface Poster {
  id: number;
  template: "statement" | "number" | "arabic" | "terminal";
  lines?: string[];
  accent?: string;
  sub?: string;
  figure?: string; // for 'number'
  prompt?: string; // for 'terminal'
  reply?: string;
}

const POSTERS: Poster[] = [
  { id: 1, template: "number", figure: "48°C", lines: ["Is your chiller ready?"], accent: "chiller", sub: "It's peak summer. Siyana knows what your AC needs." },
  { id: 2, template: "statement", lines: ["Ask your buildings", "anything."], accent: "anything.", sub: "Specs, faults & PPM — inside your AI." },
  { id: 3, template: "statement", lines: ["Now your buildings", "answer back."], accent: "answer back.", sub: "The open-source FM brain for your AI." },
  { id: 4, template: "number", figure: "10s", lines: ["Your summer cooling bill."], accent: "cooling", sub: "Estimate any building's energy in ten seconds. Free." },
  { id: 5, template: "statement", lines: ["When the sand comes,", "change the", "filters first."], accent: "filters first.", sub: "Siyana turns the forecast into a to-do list." },
  { id: 6, template: "statement", lines: ["Stop reacting.", "Start forecasting."], accent: "forecasting.", sub: "Weather-aware maintenance for the Gulf." },
  { id: 7, template: "statement", lines: ["40 years of", "FM know-how.", "One question away."], accent: "One question away.", sub: "siyana.dev" },
  { id: 8, template: "statement", lines: ["The facilities", "brain for your AI."], accent: "brain", sub: "Open-source MCP · npx siyana" },
  { id: 9, template: "arabic", sub: "Maintenance, now it thinks." },
  { id: 10, template: "statement", lines: ["Every chiller", "has a story.", "Now it talks."], accent: "Now it talks.", sub: "Ask it anything at siyana.dev" },
  { id: 11, template: "terminal", prompt: "how do I service a Daikin VRV in Dubai?", reply: "→ Siyana has the answer.", sub: "The FM knowledge MCP for your AI." },
  { id: 12, template: "statement", lines: ["Heatwave incoming.", "Your AC's to-do", "list is ready."], accent: "to-do", sub: "Forecast-driven maintenance." },
  { id: 13, template: "statement", lines: ["No API key.", "No sign-up.", "Just answers."], accent: "Just answers.", sub: "Open-source FM knowledge. Free forever." },
  { id: 14, template: "statement", lines: ["From manuals", "to answers."], accent: "answers.", sub: "Every brand, every model, one question away." },
  { id: 15, template: "statement", lines: ["The Gulf runs hot.", "Run your buildings", "smarter."], accent: "smarter.", sub: "Region-tuned FM intelligence." },
  { id: 16, template: "statement", lines: ["Dust storm?", "Filters first.", "Panic never."], accent: "Panic never.", sub: "Siyana sees the weather coming." },
  { id: 17, template: "statement", lines: ["Know the spec", "before you", "raise the PO."], accent: "spec", sub: "Cited brand & model data, instantly." },
  { id: 18, template: "statement", lines: ["Your FM team's", "new co-pilot."], accent: "co-pilot.", sub: "Inside Claude, Cursor & any MCP client." },
  { id: 19, template: "statement", lines: ["Open knowledge", "for every building", "in the Gulf."], accent: "Open knowledge", sub: "Community-built. siyana.dev" },
  { id: 20, template: "statement", lines: ["Ask once.", "Maintain right."], accent: "Maintain right.", sub: "The facilities-management brain for your AI." },

  // --- Selling / quote-faster angle ---
  { id: 21, template: "statement", lines: ["Walk the building.", "Quote it before", "you leave."], accent: "Quote it", sub: "Site survey → maintenance quotation in minutes." },
  { id: 22, template: "statement", lines: ["From site survey", "to quotation,", "in minutes."], accent: "in minutes.", sub: "Scope a contract the moment you finish the walk." },
  { id: 23, template: "statement", lines: ["Count the assets.", "Win the contract."], accent: "Win the contract.", sub: "Siyana scopes the PPM — you send the quote." },
  { id: 24, template: "number", figure: "2,868", lines: ["task-events, one tower,", "scoped instantly."], accent: "scoped instantly.", sub: "Turn an asset count into a costed scope." },
  { id: 25, template: "statement", lines: ["The fastest quote", "usually wins.", "Be fastest."], accent: "Be fastest.", sub: "Estimate on-site, before the competition." },
  { id: 26, template: "statement", lines: ["Win contracts,", "not guesswork."], accent: "not guesswork.", sub: "Defensible scope from real PPM data." },

  // --- Knowledge angle ---
  { id: 27, template: "statement", lines: ["Every asset.", "Every PPM.", "Every fault. Known."], accent: "Known.", sub: "The FM knowledge base for your AI." },
  { id: 28, template: "statement", lines: ["The collective", "FM brain —", "open to all."], accent: "open to all.", sub: "Community-built, region-tuned, free." },

  // --- Data angle ---
  { id: 29, template: "statement", lines: ["Turn a site walk", "into data."], accent: "into data.", sub: "Assets, scope, energy — structured and queryable." },
  { id: 30, template: "statement", lines: ["Assets in.", "Scope, hours, cost", "out."], accent: "Scope, hours, cost", sub: "Your quotation, backed by data." },
];

function brandMark(): string {
  // Exact website logo: the favicon icon (rounded square + sun + dune/sand curves) + "Siyana" صِيانة.
  const S = 54;
  const k = S / 64;
  return `
    <g transform="translate(64,52)">
      <g transform="scale(${k})">
        <rect width="64" height="64" rx="14" fill="${C.ink}"/>
        <circle cx="32" cy="26" r="11" fill="${C.dune}"/>
        <path d="M10 44c6-7 12-7 18-3.5S40 47 54 40" fill="none" stroke="${C.teal}" stroke-width="4" stroke-linecap="round"/>
        <path d="M10 52c8-5 14-5 22-1.5S44 54 54 49" fill="none" stroke="${C.sand}" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
      </g>
      <text x="${S + 18}" y="37" font-family="Inter, Arial, sans-serif" font-weight="700" font-size="34" fill="${C.text}">Siyana</text>
      <text x="${S + 162}" y="37" font-family="'Noto Naskh Arabic', serif" font-size="26" fill="${C.dune}">صِيانة</text>
    </g>`;
}
function footer(): string {
  return `
    <line x1="64" y1="966" x2="1016" y2="966" stroke="#2A3540" stroke-width="1.5"/>
    <text x="64" y="1012" font-family="'JetBrains Mono', monospace" font-size="30" fill="${C.sand}">siyana.dev</text>
    <text x="1016" y="1012" text-anchor="end" font-family="Inter, Arial, sans-serif" font-size="26" fill="${C.muted}">Open-source MCP</text>`;
}

function headline(lines: string[], accent: string | undefined, cy: number): string {
  const maxLen = Math.max(...lines.map((l) => l.length));
  const size = maxLen <= 13 ? 104 : maxLen <= 18 ? 86 : maxLen <= 24 ? 70 : 58;
  const lh = size * 1.08;
  const startY = cy - ((lines.length - 1) * lh) / 2 + size * 0.34;
  return lines
    .map((line, i) => {
      let content = esc(line);
      if (accent && line.includes(accent)) {
        content = esc(line).replace(esc(accent), `<tspan fill="${C.dune}">${esc(accent)}</tspan>`);
      }
      return `<text x="540" y="${startY + i * lh}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-weight="800" font-size="${size}" fill="${C.text}" letter-spacing="-1">${content}</text>`;
    })
    .join("\n");
}

function sub(text: string | undefined, y: number): string {
  if (!text) return "";
  return `<text x="540" y="${y}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="32" fill="${C.muted}">${esc(text)}</text>`;
}

function render(p: Poster): string {
  let body = "";
  if (p.template === "statement") {
    body = headline(p.lines!, p.accent, 470) + sub(p.sub, 720);
  } else if (p.template === "number") {
    body =
      `<text x="540" y="420" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-weight="800" font-size="300" fill="${C.dune}" letter-spacing="-6">${esc(p.figure!)}</text>` +
      headline(p.lines!, p.accent, 600) +
      sub(p.sub, 740);
  } else if (p.template === "arabic") {
    body =
      `<text x="540" y="470" text-anchor="middle" font-family="'Noto Naskh Arabic', serif" font-weight="700" font-size="300" fill="${C.dune}">صِيانة</text>` +
      `<text x="540" y="640" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-weight="800" font-size="72" fill="${C.text}">${esc(p.sub!)}</text>` +
      sub("Open-source FM knowledge for your AI.", 720);
  } else {
    // terminal
    body = `
      <rect x="150" y="330" width="780" height="300" rx="20" fill="${C.ink2}" stroke="#2A3540" stroke-width="1.5"/>
      <circle cx="186" cy="372" r="7" fill="${C.ember}"/><circle cx="210" cy="372" r="7" fill="${C.dune}"/><circle cx="234" cy="372" r="7" fill="${C.teal}"/>
      <text x="186" y="460" font-family="'JetBrains Mono', monospace" font-size="30" fill="${C.muted}">${esc(p.prompt!)}</text>
      <text x="186" y="540" font-family="'JetBrains Mono', monospace" font-size="34" fill="${C.sand}">${esc(p.reply!)}</text>
      ${sub(p.sub, 730)}`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#11161D"/><stop offset="1" stop-color="${C.ink}"/></linearGradient>
    <radialGradient id="haze" cx="50%" cy="0%" r="75%"><stop offset="0" stop-color="${C.dune}" stop-opacity="0.20"/><stop offset="0.55" stop-color="${C.ember}" stop-opacity="0.06"/><stop offset="1" stop-color="${C.dune}" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="1080" height="1080" fill="url(#bg)"/>
  <rect width="1080" height="1080" fill="url(#haze)"/>
  ${brandMark()}
  ${body}
  ${footer()}
</svg>
`;
}

const outDir = "site/public/posters";
mkdirSync(outDir, { recursive: true });
mkdirSync("site/src/lib", { recursive: true });
const manifest: { file: string; title: string }[] = [];
for (const p of POSTERS) {
  const file = `poster-${String(p.id).padStart(2, "0")}.svg`;
  writeFileSync(join(outDir, file), render(p), "utf8");
  const title =
    p.template === "arabic" ? p.sub! : p.template === "terminal" ? p.reply! : (p.lines ?? []).join(" ");
  manifest.push({ file: `/posters/${file}`, title });
}
writeFileSync("site/src/lib/posters.json", JSON.stringify(manifest, null, 2) + "\n", "utf8");
console.log(`generated ${POSTERS.length} posters + manifest`);
