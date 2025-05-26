// cypress/support/e2e.js

import * as l10n from './l10n.json';
import * as reqs from './requirements.js';
import * as urls from './urls.js';
import * as selectors from './selectors.js';

cy.urls = urls;
cy.selectors = selectors;

Cypress.on('test:before:run', () => {
  cy.reqs = reqs;
  cy.l10n = l10n;
});