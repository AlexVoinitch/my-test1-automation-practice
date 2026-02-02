// cypress/support/api/auth.api.commands.js

Cypress.Commands.add('auth__getToken', (userData) => {
  return cy
    .request({
      method: 'POST',
      url: `${API_URLS.BASE_URL}/auth`,
      body: {
        username: userData.username,
        password: userData.password,
      },
    })
    .then((response) => {
      if (!response.body.token) {
        cy.log('⚠️ Error Authorisation! Server Response::', JSON.stringify(response.body));
      }
      const tokenValue = response.body.token;
      Cypress.env('token', tokenValue);
      return tokenValue;
    });
});
