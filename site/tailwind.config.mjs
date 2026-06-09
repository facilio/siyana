/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}"],
  theme: {
    extend: {
      colors: {
        // Desert dusk
        ink: "#0E1116",
        "ink-2": "#141A22",
        surface: "#171E27",
        "surface-2": "#1E2733",
        border: "#2A3540",
        text: "#E7EBF0",
        muted: "#9AA6B3",
        sand: "#E7D8B4",
        dune: "#E0A458", // primary amber accent
        "dune-bright": "#F2B86E",
        ember: "#D2693C", // heat
        teal: "#5EC8C2", // data
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
        arabic: ["'Noto Naskh Arabic'", "serif"],
      },
      boxShadow: {
        glow: "0 0 60px -15px rgba(224,164,88,0.35)",
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 40px -24px rgba(0,0,0,0.7)",
      },
      backgroundImage: {
        "heat-haze":
          "radial-gradient(80% 50% at 50% -10%, rgba(224,164,88,0.18), transparent 60%), radial-gradient(50% 40% at 80% 0%, rgba(210,105,60,0.12), transparent 60%)",
        grid: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
