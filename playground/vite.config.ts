import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The library's type-definition files live one level up in ../src.
// We import them as raw strings (see data/libSources.ts) so Monaco can load
// them as extra libs and type-check real Typed Japanese code in the browser.
export default defineConfig({
  plugins: [react()],
  // Deployed under a subpath on GitHub Pages; relative base keeps assets working
  // both there and on StackBlitz / local preview.
  base: "./",
  server: {
    fs: {
      // Allow importing the .d.ts sources from the parent package.
      allow: [".."],
    },
  },
});
