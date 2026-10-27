# Playwright QA Framework (JavaScript)

UI and API test automation framework built from scratch with Playwright.

- **UI target:** https://www.saucedemo.com (retail demo shop: login, products, cart, checkout)
- **API target:** https://jsonplaceholder.typicode.com

## Features
- Page Object Model (`pages/`)
- Custom Playwright fixtures (`fixtures/`), so tests get page objects injected
- Test data kept separate from tests (`test-data/`)
- Tags for suites: `@smoke`, `@regression`
- Separate projects for UI (Chromium, Firefox) and API
- Parallel execution, retries on CI
- Screenshots, video and traces on failure
- HTML report
- CI with GitHub Actions

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
npm run report           # open the last HTML report
```

Run headed or in debug mode:
```bash
npx playwright test --headed
npx playwright test --debug
```

## Structure
```
config/      environment settings
fixtures/    custom fixtures (page objects, logged-in state)
pages/       Page Object classes
test-data/   users and input data
tests/ui/    UI tests
tests/api/   API tests
```
