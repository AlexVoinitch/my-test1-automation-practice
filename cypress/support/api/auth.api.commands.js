// cypress/support/api/auth.api.commands.js
Cypress.Commands.add('auth__getToken', (userData) => {
  return cy
    .request({
      method: 'POST',
      url: `${API_URLS.BASE_URL}${API_URLS.ENDPOINTS.AUTH}`,
      body: {
        username: userData.username,
        password: userData.password,
      },
    })
    .then((response) => {
      if (!response.body.token) {
        const errorMsg = `❌ Authorization Failed! Server Response: ${JSON.stringify(response.body)}`;
        throw new Error(errorMsg);
      }

      const tokenValue = response.body.token;
      Cypress.env('token', tokenValue);
      return tokenValue;
    });
});
