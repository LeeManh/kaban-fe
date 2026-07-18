import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:5173";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: "html",
  timeout: 30_000,

  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  webServer: {
    command: "npm run dev",
    url: baseURL,
    reuseExistingServer: true,
    timeout: 120_000,
  },

  projects: [
    { name: "setup", testMatch: /.*\.setup\.ts/ },
    {
      name: "Desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 800 },
        storageState: "e2e/.auth/owner.json",
      },
      dependencies: ["setup"],
    },
    {
      name: "Tablet",
      use: {
        ...devices["iPad Mini"],
        storageState: "e2e/.auth/owner.json",
      },
      dependencies: ["setup"],
    },
    {
      name: "Mobile",
      use: {
        ...devices["iPhone 13"],
        storageState: "e2e/.auth/owner.json",
      },
      dependencies: ["setup"],
    },
  ],
});
