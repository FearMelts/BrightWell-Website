import { defineConfig, devices } from '@playwright/test'

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // === TEST DIRECTORY ===
  testDir: './e2e',
  
  // === RUN TESTS IN PARALLEL ===
  fullyParallel: true,
  
  // === FAIL BUILD ON CI IF ACCIDENTALLY LEFT TEST.ONLY ===
  forbidOnly: !!process.env.CI,
  
  // === RETRY CONFIGURATION ===
  retries: process.env.CI ? 2 : 0,
  
  // === WORKER CONFIGURATION ===
  workers: process.env.CI ? 1 : undefined,
  
  // === REPORTER CONFIGURATION ===
  reporter: [
    ['html'],
    ['json', { outputFile: 'playwright-report/test-results.json' }],
    ['junit', { outputFile: 'playwright-report/test-results.xml' }],
    process.env.CI ? ['github'] : ['list'],
  ],
  
  // === GLOBAL SETUP ===
  globalSetup: require.resolve('./e2e/global-setup'),
  globalTeardown: require.resolve('./e2e/global-teardown'),
  
  // === SHARED SETTINGS ===
  use: {
    // Base URL for tests
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
    
    // Collect trace when retrying the failed test
    trace: 'on-first-retry',
    
    // Record video only on failures
    video: 'retain-on-failure',
    
    // Take screenshot on failure
    screenshot: 'only-on-failure',
    
    // Browser context options
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    
    // Emulate user locale and timezone
    locale: 'en-US',
    timezoneId: 'America/New_York',
    
    // Color scheme
    colorScheme: 'light',
    
    // Accept downloads
    acceptDownloads: true,
    
    // Action timeout
    actionTimeout: 10000,
    
    // Navigation timeout
    navigationTimeout: 30000,
  },

  // === PROJECTS FOR DIFFERENT BROWSERS ===
  projects: [
    // === DESKTOP BROWSERS ===
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    
    // === MOBILE BROWSERS ===
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
    
    // === TABLET ===
    {
      name: 'tablet',
      use: { ...devices['iPad Pro'] },
    },
    
    // === ACCESSIBILITY TESTING ===
    {
      name: 'accessibility',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**/accessibility.spec.ts',
    },
    
    // === PERFORMANCE TESTING ===
    {
      name: 'performance',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**/performance.spec.ts',
    },
    
    // === MEDICAL BILLING SPECIFIC ===
    {
      name: 'medical-billing',
      use: { 
        ...devices['Desktop Chrome'],
        // Simulate healthcare environment
        userAgent: 'BrightWell-Medical-Billing-System/1.0',
      },
      testMatch: '**/medical-billing/**/*.spec.ts',
    },
  ],

  // === WEB SERVER ===
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
    env: {
      NODE_ENV: 'test',
    },
  },
  
  // === OUTPUT DIRECTORY ===
  outputDir: 'playwright-results/',
  
  // === TIMEOUT ===
  timeout: 30000,
  expect: {
    timeout: 10000,
  },
  
  // === METADATA ===
  metadata: {
    'test-type': 'e2e',
    'project': 'BrightWell Medical Billing Website',
    'environment': process.env.NODE_ENV || 'test',
  },
})