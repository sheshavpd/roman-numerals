import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    coverage: {
      provider: "istanbul", // Coverage provider
      reporter: ["text", "html"],
    },
  },
});