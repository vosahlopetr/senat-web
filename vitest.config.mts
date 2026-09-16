import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    // Resolve `@/*` imports from tsconfig.json paths.
    tsconfigPaths: true,
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
