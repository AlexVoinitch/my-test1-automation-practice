// cypress/integration/api/ping.api.spec.js

describe('Ping API: Given the API service is available', function () {
  context('When performing a health check', function () {
    it('Then it should return 201 status confirming the service is running', function () {
      cy.health__getCheck().then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.eq('Created');
      });
    });
  });
});
