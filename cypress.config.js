const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/integration/**/*.spec.js',
    setupNodeEvents(on, config) {
      return config
    },

    env: {
      environment: 'development',
    },
  },
})
