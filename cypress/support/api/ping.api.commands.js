// cypress/support/api/ping.api.commands.js

import { BASE_URL, ENDPOINTS } from './api-urls';

Cypress.Commands.add('api__getHealthCheck', () => {
  return cy.request({
    method: 'GET',
    url: `${BASE_URL}${ENDPOINTS.PING}`,
    failOnStatusCode: true,
  });
});
