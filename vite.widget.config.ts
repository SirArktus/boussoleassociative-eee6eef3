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
  },
});
