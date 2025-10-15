// cypress/support/e2e.js

import * as l10n from './l10n.json'
import * as urls from './urls.js'
import * as selectors from './selectors.js'
import './commands'

cy.urls = urls
cy.selectors = selectors
cy.l10n = l10n
