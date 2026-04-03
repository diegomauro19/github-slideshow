import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0D1B2A",
        "dark-blue": "#1B4F72",
        "accent-blue": "#2980B9",
        teal: "#148F77",
        green: "#1E8449",
        red: "#C0392B",
        amber: "#F39C12",
        background: "#F8F9FA",
        card: "#FFFFFF",
        foreground: "#171717",
      },
      fontFamily: {
        heading: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        data: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
