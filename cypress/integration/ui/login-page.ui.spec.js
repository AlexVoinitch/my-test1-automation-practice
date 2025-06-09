// cypress/integration/ui/login-page.ui.spec.js
// / <reference types="cypress" />

// describe block title: PageName.ComponentName: Given 'preconditions'
describe('LoginPage.UI: Given various login scenarios', { testIsolation: false }, () => {

  // context block title: PageName.ComponentName.USER_ROLE: When 'condition'
  context('LoginPage.UI.STANDARD_USER: When logging in with valid credentials', () => {
      before(() => {
      cy.login(cy.reqs.standardUsername, cy.reqs.validPassword);
    });

    // it block title: PageName.ComponentName.USER_ROLE: Then 'expected result'
    it('LoginPage.UI.STANDARD_USER: Then I should be redirected to the products page', () => {
      cy.url().should('eq', cy.urls.homePage);
    });

    it('LoginPage.UI.STANDARD_USER: Then I should see the product list title', () => {
      cy.get(cy.selectors.homePage.title)
        .should('be.visible')
        .and('contain', cy.l10n.productsPage.title);
    });
  });

  context(
    'LoginPage.UI.INVALID_USER: When logging in with invalid username',
    () => {
      before(() => {
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
      before(() => {
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
      before(() => {
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
      before(() => {
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