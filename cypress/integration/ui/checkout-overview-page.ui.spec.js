import checkoutData from '../../support/test-data/checkout-data.js';

describe('CheckoutOverviewPage: Given a STANDARD_USER is on the Checkout Step Two (Overview) page', { testIsolation: false }, function () {
  before(function () {
    this.checkoutData = checkoutData;
    cy.userManagement__getUserDataByRole(userRoles.STANDARD)
      .then((user) => {
        this.standardUser = user;
      })
      .then(() => {
        const data = this.checkoutData;

        cy.clearLocalStorage();
        cy.visit(appUrls.loginPage);
        cy.loginPage__login(this.standardUser);

        cy.get(inventoryPage.addToCartButton).first().click();
        cy.get(inventoryPage.cartBadge).click();
        cy.get(cartPage.checkoutButton).click();
        cy.url().should('include', appUrls.checkoutStepOne);

        cy.get(checkoutInfoPage.firstNameInput).type(data.firstName);
        cy.get(checkoutInfoPage.lastNameInput).type(data.lastName);
        cy.get(checkoutInfoPage.postalCodeInput).type(data.postalCode);
        cy.get(checkoutInfoPage.continueButton).click();

        cy.url().should('include', appUrls.checkoutStepTwo);
      });
  });
  context('CheckoutOverviewPage.STANDARD_USER: When user verifies the order summary', function () {
    it('CheckoutOverviewPage.Verify.STANDARD_USER: Then Item total price is displayed', function () {
      cy.get(checkoutOverviewPage.itemTotal).should('contain', 'Item total:');
    });
  });

  context('CheckoutOverviewPage.STANDARD_USER: When user completes the order', function () {
    before(function () {
      cy.get(checkoutOverviewPage.finishButton).click();
    });

    it('CheckoutOverviewPage.Finish.STANDARD_USER: Then user is redirected to the Checkout Complete page', function () {
      cy.url().should('include', appUrls.checkoutComplete);
    });
  });
});
