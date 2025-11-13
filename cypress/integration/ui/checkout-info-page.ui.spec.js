describe('CheckoutInfoPage: Given a STANDARD_USER is on the Checkout Step One page', { testIsolation: false }, function () {
  before(function () {
    cy.fixture('checkout-data.json').then((data) => {
      this.checkoutData = data;
    });

    cy.userManagement__getUserDataByRole(userRoles.STANDARD)
      .then((user) => {
        this.standardUser = user;
      })
      .then(() => {
        //const data = this.checkoutData; // this was the error cause
        const standardUser = this.standardUser;

        cy.clearLocalStorage();
        cy.visit(appUrls.loginPage);
        cy.loginPage__login(standardUser);

        cy.get(inventoryPage.addToCartButton).first().click();
        cy.get(inventoryPage.cartBadge).click();
        cy.get(cartPage.checkoutButton).click();
        cy.url().should('include', 'checkout-step-one.html');
      });
  });

  context('CheckoutInfoPage.STANDARD_USER: When user enters valid shipping information', function () {
    before(function () {
      const data = this.checkoutData;
      cy.get(checkoutInfoPage.firstNameInput).type(data.firstName);
      cy.get(checkoutInfoPage.lastNameInput).type(data.lastName);
      cy.get(checkoutInfoPage.postalCodeInput).type(data.postalCode);
      cy.get(checkoutInfoPage.continueButton).click();
    });

    it('CheckoutInfoPage.FillForm.STANDARD_USER: Then user is redirected to the Checkout Step Two page', function () {
      cy.url().should('include', 'checkout-step-two.html');
    });
  });
});
