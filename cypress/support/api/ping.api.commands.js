// cypress/support/api/ping.api.commands.js

import { ENDPOINTS } from '../constants/api-urls';

Cypress.Commands.add('health__getCheck', () => {
  const apiUrl = Cypress.env('apiBaseUrl');

  return cy.request({
    method: 'GET',
    url: `${apiUrl}${ENDPOINTS.PING}`,
  });
});
