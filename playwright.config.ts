import { defineConfig, devices } from '@playwright/test';
import { env, STORAGE_STATE } from './config/env';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 30_000,
  expect: { timeout: 5_000 },
  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    testIdAttribute: 'data-test', // saucedemo uses data-test instead of data-testid
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    // 1. Logs in once and saves the session, so UI tests don't repeat the login form.
    {
      name: 'setup',
      testDir: './tests/setup',
      testMatch: /.*\.setup\.ts/,
      use: { baseURL: env.uiBaseUrl },
    },

    // 2. UI tests start already logged in (login.spec.ts opts out).
    {
      name: 'ui-chromium',
      testDir: './tests/ui',
      dependencies: ['setup'],
      use: { ...devices['Desktop Chrome'], baseURL: env.uiBaseUrl, storageState: STORAGE_STATE },
    },
    {
      name: 'ui-firefox',
      testDir: './tests/ui',
      dependencies: ['setup'],
      use: { ...devices['Desktop Firefox'], baseURL: env.uiBaseUrl, storageState: STORAGE_STATE },
    },

    // 3. API tests need no browser.
    {
      name: 'api',
      testDir: './tests/api',
      use: { baseURL: env.apiBaseUrl },
    },
  ],
});
