/// <reference types="cypress" />

// describe block title: PageName.ComponentName: Given 'preconditions'
describe('LoginPage.UI: Given various login scenarios', { testIsolation: false }, () => {

  // context block title: PageName.ComponentName.USER_ROLE: When 'condition'
  context('LoginPage.UI.STANDARD_USER: When logging in with valid credentials', () => {
    beforeEach(() => {
      cy.visit(cy.urls.loginPage);

      cy.get(cy.selectors.loginPage.usernameInput, { timeout: 10000 })
        .should('be.visible');
      cy.get(cy.selectors.loginPage.usernameInput)
        .type(cy.reqs.standardUsername);

      cy.get(cy.selectors.loginPage.passwordInput)
        .should('be.visible');
      cy.get(cy.selectors.loginPage.passwordInput)
        .type(cy.reqs.validPassword);

      cy.get(cy.selectors.loginPage.loginButton).click();
    });

    // it block title: PageName.ComponentName.USER_ROLE: Then 'expected result'
    it('LoginPage.UI.STANDARD_USER: Then I should be redirected to the products page and see the product list', () => {
      cy.url().should('eq', cy.urls.homePage);
      cy.get(cy.selectors.homePage.productTitle).should('be.visible').and('contain', 'Products');
    });
  });

  context(
    'LoginPage.UI.INVALID_USER: When logging in with invalid username',
    () => {
      beforeEach(() => {
        cy.visit(cy.urls.loginPage);
        // ... (Not implemented yet)
      });

      it.skip('LoginPage.UI.INVALID_USER: Then I should see an error message indicating incorrect credentials', () => {
        // ... (Not implemented yet)
      });
    }
  );

  context(
    'LoginPage.UI.INVALID_PASSWORD: When logging in with invalid password',
    () => {
      beforeEach(() => {
        cy.visit(cy.urls.loginPage);
        // ... (Not implemented yet)
      });

      it.skip('LoginPage.UI.INVALID_PASSWORD: Then I should see an error message indicating incorrect credentials', () => {
        // ... (Not implemented yet)
      });
    }
  );

  context(
    'LoginPage.UI.LOCKED_OUT_USER: When logging in as a locked-out user',
    () => {
      beforeEach(() => {
        cy.visit(cy.urls.loginPage);
        // ... (Not implemented yet)
      });

      it.skip('LoginPage.UI.LOCKED_OUT_USER: Then I should see an error message indicating that the user is locked out', () => {
        // ... (Not implemented yet)
      });
    }
  );

  context(
    'LoginPage.UI.EMPTY_FIELDS: When logging in with empty fields',
    () => {
      beforeEach(() => {
        cy.visit(cy.urls.loginPage);
        // ... (Not implemented yet)
      });

      it.skip('LoginPage.UI.EMPTY_FIELDS: Then I should see an error message indicating that the username is required', () => {
        // ... (Not implemented yet)
      });

      it.skip('LoginPage.UI.EMPTY_FIELDS: Then I should see an error message indicating that the password is required', () => {
        // ... (Not implemented yet)
      });
    }
  );
});