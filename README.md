# SauceDemo Playwright Automation

End-to-end UI test suite for [saucedemo.com](https://www.saucedemo.com), built with
Playwright + TypeScript, using a Page Object Model, and wired into a Jenkins
CI/CD pipeline.

## Project structure

```
.
├── pages/                  # Page Object Model classes
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── tests/                  # Test specs
│   ├── login.spec.ts
│   ├── inventory.spec.ts
│   └── cart-checkout.spec.ts
├── fixtures/
│   └── test-data.ts        # Users, products, checkout info
├── playwright.config.ts
├── Jenkinsfile              # Declarative Jenkins pipeline
├── package.json
└── tsconfig.json
```

## Local setup

```bash
npm install
npx playwright install --with-deps   # downloads browsers
npm test                             # run all tests, all browsers
npm run test:chromium                # run against Chromium only
npm run test:ui                      # interactive UI mode (great for debugging)
npm run report                       # open the last HTML report
```

## Jenkins setup

The `Jenkinsfile` uses Microsoft's official Playwright Docker image
(`mcr.microsoft.com/playwright:v1.47.0-jammy`), so the Jenkins agent needs
Docker available — you don't need to manually install Node, browsers, or
system dependencies on the agent itself.

### 1. Prerequisites on the Jenkins controller/agent

- Docker installed and the Jenkins user has permission to run it
  (`docker ps` should work as the Jenkins user).
- Plugins installed:
  - **Docker Pipeline** (lets `agent { docker { ... } }` work)
  - **JUnit** (usually built in) — parses `test-results/junit.xml`
  - **HTML Publisher** — publishes the Playwright HTML report as a build tab

### 2. Create the pipeline job

1. New Item → Pipeline (or Multibranch Pipeline if you want a job per branch/PR).
2. Under **Pipeline**, set "Definition" to *Pipeline script from SCM*.
3. Point it at your Git repo and set the script path to `Jenkinsfile`.
4. Save and click **Build Now**.

### 3. What the pipeline does

| Stage | Purpose |
|---|---|
| Install dependencies | `npm ci` inside the Playwright container |
| Run Playwright tests | Runs the full suite, writes JUnit + HTML reports |
| Publish results | Publishes JUnit results and the HTML report as build artifacts |
| Evaluate test result | Fails the build if any test failed (kept separate so reports still publish even on failure) |

After a build, you'll see:
- A **Test Result** trend graph (from the JUnit plugin)
- A **Playwright HTML Report** tab (from HTML Publisher) with traces, screenshots, and videos for any failures

### 4. Optional: trigger on every push

If your repo is on GitHub/GitLab, add a webhook to your Jenkins server's
`/github-webhook/` (or GitLab equivalent) endpoint, and enable
"GitHub hook trigger for GITScm polling" in the job config so builds kick
off automatically on push/PR.

## Notes on the test design

- **Page Object Model** — each page's locators and actions live in `pages/`,
  keeping test specs focused on behavior, not selectors.
- **Fixtures** — shared test data (users, products) lives in `fixtures/test-data.ts`
  so you're not hardcoding strings across specs.
- **Traces/videos on failure only** — configured in `playwright.config.ts` to keep
  CI artifacts small while still giving you a trace to debug failures.
- **Retries in CI** — `retries: 2` when `CI=true`, to absorb flaky network blips
  without masking real bugs (a genuinely broken test will still fail all 3 attempts).
