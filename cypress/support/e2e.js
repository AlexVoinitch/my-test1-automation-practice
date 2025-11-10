// cypress/support/e2e.js

import l10n from './l10n.json'
import urls from './urls.js'
import selectors from './selectors.js'
import './commands'

global.inventoryPage = selectors.inventoryPage
global.loginPage = selectors.loginPage
global.cartPage = selectors.cartPage
global.homePage = selectors.homePage

global.urls = urls
global.l10n = l10n
