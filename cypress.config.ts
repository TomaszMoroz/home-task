import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    // Base URL for your application
    baseUrl: 'http://localhost:8080', // Update with your dev server's URL

    // Folder where your E2E tests are located
    specPattern: 'tests/**/*.cy.js',
    
    // Folder where Cypress will output screenshots and videos
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',

    // Custom configuration options
    viewportWidth: 1280,
    viewportHeight: 720,
    chromeWebSecurity: false, // Set to true if you don’t need to test across multiple domains
    
    // Setup file for global configuration
    setupNodeEvents(on, config) {
      // You can add custom plugins here
    },

    // Additional configuration options
    env: {
      // Define environment variables here
    },
  },
})
