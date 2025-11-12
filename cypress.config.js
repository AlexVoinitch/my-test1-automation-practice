const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/integration/**/*.spec.js',
    setupNodeEvents(on, config) {
      const targetEnv = process.env.TARGET_ENV || 'dev';
      config.env = targetEnv ? config.env[targetEnv] : config.env.dev;
      return config;
    },
    env: {
      dev: {
        envName: 'dev',
        baseUrl: 'https://www.saucedemo.com',
      },
    },
  },
});
