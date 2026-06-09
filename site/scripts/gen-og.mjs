// Rasterise the OG image: public/og.svg -> public/og.png (1200x630).
// Social platforms (LinkedIn, X, Slack, WhatsApp…) don't render SVG OG images, so we ship a PNG.
// Regenerate after editing og.svg:  npm run gen:og
import { Resvg } from "@resvg/resvg-js";
import { readFileSync, writeFileSync } from "node:fs";

const svg = readFileSync(new URL("../public/og.svg", import.meta.url), "utf8");
const png = new Resvg(svg, {
  fitTo: { mode: "width", value: 1200 },
  font: { loadSystemFonts: true },
  background: "#0E1116",
}).render().asPng();

writeFileSync(new URL("../public/og.png", import.meta.url), png);
console.log(`Wrote public/og.png (${png.length} bytes)`);
