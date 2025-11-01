import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://www.booking.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 15000,
    specPattern: 'cypress/e2e/**/*.spec.ts',
    video: false,
    retries: 1,
    setupNodeEvents(on, config) {
      return config;
    }
  }
});
