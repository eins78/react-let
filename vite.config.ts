// see https://vitejs.dev/guide/build.html#library-mode
import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/main.ts"),
      name: "ReactLet",
      // the proper extensions will be added
      fileName: "react-let",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      external: ["react"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: "React",
        },
      },
    },
  },
});
