/// <reference types="cypress" />

describe('Login Page UI', { testIsolation: false }, () => {
  beforeEach(() => {
    cy.visit(cy.urls.loginPage);
  });

  context('As a user, I want to log in with valid credentials', () => {
    it('Given I am on the login page', () => {
      cy.url().should('eq', cy.urls.loginPage);
    });

    it('When I enter a valid username', () => {
      // Добавлено ожидание, что элемент будет видим
      cy.get(cy.selectors.loginPage.usernameInput, { timeout: 10000 }).should('be.visible').type(cy.reqs.standardUsername);

      // Добавлено использование debug для отладки элемента
      cy.get(cy.selectors.loginPage.usernameInput).debug();
    });

    it('And I enter a valid password', () => {
      cy.get(cy.selectors.loginPage.passwordInput).type(cy.reqs.validPassword);
    });

    it('And I click the "Login" button', () => {
      cy.get(cy.selectors.loginPage.loginButton).click();
    });

    it('Then I should be redirected to the home page', () => {
      cy.url().should('eq', cy.urls.homePage);
    });

    it('And I should see the product list', () => {
      cy.get(cy.selectors.homePage.productTitle).should('be.visible');
    });
  });

  context('As a user, I want to see an error message when I log in with invalid credentials', () => {
    it.skip('Given I am on the login page', () => {
      // Not implemented yet
    });

    it.skip('When I enter an invalid username and a valid password', () => {
      // Not implemented yet
    });

    it.skip('And I click the "Login" button', () => {
      // Not implemented yet
    });

    it.skip('Then I should see an error message indicating