// cypress/support/api/ping.api.commands.js

import { BASE_URL, ENDPOINTS } from '../constants/api-urls';

Cypress.Commands.add('health__getCheck', () => {
  return cy.request({
    method: 'GET',
    url: `${BASE_URL}${ENDPOINTS.PING}`,
    failOnStatusCode: true,
  });
});
