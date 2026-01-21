// cypress/support/api/auth.api.commands.js

Cypress.Commands.add('api__getAuthToken', (credentials) => {
  return cy
    .request({
      method: 'POST',
      url: `${API_URLS.BASE_URL}${API_URLS.ENDPOINTS.AUTH}`,
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
