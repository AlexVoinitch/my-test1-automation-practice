// cypress/support/api/auth.api.commands.js

import { BASE_URL, ENDPOINTS } from './api-urls';

Cypress.Commands.add('api__getAuthToken', () => {
  const credentials = {
    username: 'admin',
    password: 'password123',
  };

  return cy
    .request({
      method: 'POST',
      url: `${BASE_URL}${ENDPOINTS.AUTH}`,
      body: credentials,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    .then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token').to.be.a('string').and.not.be.empty;
      Cypress.env('authToken', response.body.token);
    });
});
