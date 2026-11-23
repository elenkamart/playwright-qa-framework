# Playwright QA Framework (TypeScript)

![Playwright Tests](https://github.com/elenkamart/playwright-qa-framework/actions/workflows/tests.yml/badge.svg)

UI and API test automation framework built from scratch with Playwright and TypeScript.

- **UI target:** https://www.saucedemo.com (retail demo shop: login, products, cart, checkout)
- **API target:** https://jsonplaceholder.typicode.com

## Features
- **TypeScript** with strict type checking (`npm run typecheck`, also runs in CI)
- **Page Object Model** with typed locators (`pages/`)
- **Custom fixtures** that inject page objects into tests (`fixtures/`)
- **Login once, reuse everywhere:** a setup project logs in and saves `storageState`; UI tests start already authenticated
- **Data-driven tests** (one generated test per required checkout field)
- **Network interception** with `page.route` (resilience test with blocked images)
- **API tests:** status codes, headers, response shape validation, query params, POST / PATCH / DELETE, negative cases
- Tags for suites: `@smoke`, `@regression`
- Projects for UI (Chromium, Firefox) and API; parallel execution, retries on CI
- Screenshots, video and traces on failure; HTML report
- **CI with GitHub Actions:** type check + tests on every push and pull request, report uploaded as an artifact

## Setup
```bash
npm install
npx playwright install
```

## Run
```bash
npm test                 # everything
npm run test:smoke       # only @smoke
npm run test:regression  # only @regression
npm run test:ui          # UI, Chromium only
npm run test:api         # API only
npm run typecheck        # TypeScript check without running tests
npm run report           # open the last HTML report
```

Run headed or in debug mode:
```bash
npx playwright test --headed
npx playwright test --debug
```

Run against another environment:
```bash
UI_BASE_URL=https://staging.example.com npm test
```

## Structure
```
config/        environment settings and storage-state path
fixtures/      custom fixtures (page objects, logged-in inventory)
pages/         Page Object classes
test-data/     users and input data
tests/setup/   one-time login that saves the session
tests/ui/      UI tests
tests/api/     API tests and response types
```

## Design decisions
- **`data-test` locators** (`testIdAttribute` in the config): stable and independent of layout and text.
- **No hard waits:** only Playwright auto-waiting and web-first assertions (`toHaveText`, `toHaveCount`).
- **Independent tests:** each test gets a fresh browser context with the saved session, so tests can run in any order and in parallel.
- **Assertions live in tests, not in page objects**, so page objects stay reusable.
