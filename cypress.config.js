const { defineConfig } = require('cypress')
const fs = require('fs')
const path = require('path')

const USERS_FILE = path.resolve(
  __dirname,
  'cypress',
  'sensitive-data',
  'env-users.json'
)

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/integration/**/*.spec.js',
    setupNodeEvents(on, config) {
      let users = {}
      if (fs.existsSync(USERS_FILE)) {
        const usersJson = fs.readFileSync(USERS_FILE, 'utf8')
        users = JSON.parse(usersJson)
      } else {
        console.warn(
          `[SECURITY WARNING] Sensitive users file not found at: ${USERS_FILE}`
        )
      }

      config.env = {
        ...config.env,
        ...users,
      }
      return config
    },

    env: {
      environment: 'development',
    },
  },
})
