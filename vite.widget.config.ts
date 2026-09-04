// Separate, self-contained build for the embeddable WordPress widget
// (a single JS file registering the <boussole-associative> custom element).
// Deliberately NOT using @lovable.dev/vite-tanstack-config here: that wrapper
// wires up TanStack Start/Nitro SSR for the main site, which the widget
// (a plain client-side custom element) doesn't need or want.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [tsconfigPaths(), react(), tailwindcss()],
  publicDir: false,
  // React/scheduler read process.env.NODE_ENV; unlike the main app build
  // (wired up by @lovable.dev/vite-tanstack-config), this standalone config
  // doesn't get that replaced automatically, which throws
  // `ReferenceError: process is not defined` in the browser at runtime.
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    outDir: "dist-widget",
    emptyOutDir: true,
    // Inline fonts/assets as base64 so the widget stays a single drop-in
    // file — no separate asset files to also upload to WordPress.
    assetsInlineLimit: 1_000_000,
    cssCodeSplit: false,
    lib: {
      entry: resolve(dirname, "src/embed.tsx"),
      name: "BoussoleAssociativeWidget",
      formats: ["iife"],
      fileName: () => "boussole-associative-widget.js",
    },
    rollupOptions: {
      output: {
        // Defensive fallback in case anything still reads `process` at
        // runtime outside what `define` statically replaced.
        banner:
          "if(typeof process==='undefined'){var process={env:{NODE_ENV:'production'}};}",
      },
    },
  },
});
