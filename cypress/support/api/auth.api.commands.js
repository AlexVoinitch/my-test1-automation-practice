// cypress/support/api/auth.api.commands.js

Cypress.Commands.add('auth__getToken', (credentials) => {
  return cy
    .request({
      method: 'POST',
      url: `${Cypress.env('apiBaseUrl')}${API_URLS.ENDPOINTS.AUTH}`,
      body: credentials,
      headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => {
      const token = response.body.token;

      if (token) {
        Cypress.env('authToken', token);
        cy.log('✅ Token successfully saved');
      } else {
        cy.log('❌ AUTH FAILED. Reason:', response.body.reason || 'Unknown error');
      }
    });
});
