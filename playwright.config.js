const { defineConfig, devices } = require('@playwright/test');
const env = require('./config/env');

module.exports = defineConfig({
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
    { name: 'ui-chromium', testDir: './tests/ui', use: { ...devices['Desktop Chrome'], baseURL: env.uiBaseUrl } },
    { name: 'ui-firefox', testDir: './tests/ui', use: { ...devices['Desktop Firefox'], baseURL: env.uiBaseUrl } },
    { name: 'api', testDir: './tests/api', use: { baseURL: env.apiBaseUrl } },
  ],
});
