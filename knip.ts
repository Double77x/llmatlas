import type { KnipConfig } from "knip";

const config: KnipConfig = {
  // Files to examine for unused exports/types
  project: ["src/**/*.{ts,tsx}"],

  // Files to exclude from analysis
  ignore: ["**/*.d.ts", "src/components/ui/**"],

  // Dependencies to ignore (false positives from CSS/Vite usage)
  ignoreDependencies: [
    "tailwindcss-animate", // Used in index.css via @plugin
    "tailwindcss",         // Used by Vite plugin
    "dotenv"               // Used in scripts
  ],

  // Specific plugin configuration
  vite: {
    config: ["vite.config.ts"],
  },
};

export default config;
