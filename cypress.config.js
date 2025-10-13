const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    env: {
      environment: 'development',
    },
    specPattern: 'cypress/integration/**/*.spec.js',
  },
})