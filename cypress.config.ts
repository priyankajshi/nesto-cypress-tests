import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://app.qa.nesto.ca',
    supportFile: 'cypress/support/e2e.ts',
    fixturesFolder: 'cypress/fixtures',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    downloadsFolder: 'cypress/downloads',
    video: true,
    videoCompression: 32,
    trashAssetsBeforeRuns: true,
    specPattern: 'cypress/**/*.spec.ts',
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports/mochawesome',
      overwrite: false,
      html: true,
      json: true,
      quiet: true,
      timestamp: 'mmddyyyy_HHMMss',
      inlineAssets: true
    },
    defaultCommandTimeout: 8000,
    viewportWidth: 1280,
    viewportHeight: 720,
  }
});