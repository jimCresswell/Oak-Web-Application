/**
 * Local testing against downloaded Playwright browsers.
 */

import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

import {
  LOCAL_TESTING,
  PLAYWRIGHT_REPORTER,
} from "./e2e_tests/browser/fixtures/flags";

// Cloudflare Access token
const CfAccessClientId = process.env.CF_ACCESS_CLIENT_ID || "";
const CfAccessClientSecret = process.env.CF_ACCESS_CLIENT_SECRET || "";
if (!LOCAL_TESTING && (!CfAccessClientId || !CfAccessClientSecret)) {
  throw new TypeError(
    "Please specify Cloudflare Access token headers in envs\nfor background info see https://developers.cloudflare.com/cloudflare-one/identity/service-tokens/"
  );
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: "./e2e_tests/browser/engineering_tests",
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: LOCAL_TESTING ? 30000 : 5000,
  },
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: PLAYWRIGHT_REPORTER || "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    extraHTTPHeaders: LOCAL_TESTING
      ? undefined
      : {
          "CF-Access-Client-Id": CfAccessClientId,
          "CF-Access-Client-Secret": CfAccessClientSecret,
        },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

if (LOCAL_TESTING) {
  config.webServer = {
    command: "npm run dev",
    port: 3000,
  };
}

export default config;
