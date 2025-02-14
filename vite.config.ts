import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { terser } from 'rollup-plugin-terser';
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills()
  ],
  base: ((process.env.GITHUB_REPOSITORY ?? "") + "/").match(/(\/.*)/)?.[1],
  server: {
    https: {
      key: fs.readFileSync('key.pem'),  // Adjust the path to your key file
      cert: fs.readFileSync('cert.pem'), // Adjust the path to your cert file
    },
    host: 'localhost', // or your local IP address
    port: 3000,
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      plugins: [
        terser({
          mangle: true,
          compress: {
            drop_console: true,
          },
        })
      ],
      output: {
        manualChunks: undefined,
      },
    },
  },
});
