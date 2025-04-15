const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    env: {
      environment: 'development', // Set the environment
    },
    // You can add other Cypress configurations here
  },
})