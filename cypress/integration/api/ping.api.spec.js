// cypress/integration/api/ping.api.spec.js

describe('Ping Endpoint: Health Check', function () {
  context('Ping GET: When checking API health', function () {
    it('should successfully return 201 status, confirming the API is running', function () {
      cy.api__getHealthCheck().then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.eq('Created');
      });
    });
  });
});
