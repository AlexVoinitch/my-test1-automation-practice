// cypress/support/e2e.js
import * as l10n from '../../support/l10n.json';
import * as reqs from '../../support/requirements.js';
import * as urls from '../../support/urls.js';
import * as selectors from '../../support/selectors.js';

Cypress.on('test:before:run', () => {
  cy.l10n = l10n;
  cy.reqs = reqs;
  cy.urls = urls;
  cy.selectors = selectors;
});