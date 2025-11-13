describe('CheckoutCompletePage: Given a STANDARD_USER has successfully completed an order', { testIsolation: false }, function () {
  before(function () {
    cy.fixture('checkout-data.json').then((data) => {
      this.checkoutData = data;
    });

    cy.userManagement__getUserDataByRole(userRoles.STANDARD)
      .then((user) => {
        this.standardUser = user;
      })
      .then(() => {
        const data = this.checkoutData;
        const standardUser = this.standardUser;

        cy.clearLocalStorage();
        cy.visit(appUrls.loginPage);
        cy.loginPage__login(standardUser);

        cy.get(inventoryPage.addToCartButton).first().click();
        cy.get(inventoryPage.cartBadge).click();
        cy.get(cartPage.checkoutButton).click();

        cy.get(checkoutInfoPage.firstNameInput).type(data.firstName);
        cy.get(checkoutInfoPage.lastNameInput).type(data.lastName);
        cy.get(checkoutInfoPage.postalCodeInput).type(data.postalCode);
        cy.get(checkoutInfoPage.continueButton).click();

        cy.get(checkoutOverviewPage.finishButton).click();

        cy.url().should('include', 'checkout-complete.html');
      });
  });

  context('CheckoutCompletePage.STANDARD_USER: When user is redirected to the confirmation page', function () {
    it('CheckoutCompletePage.Verify.STANDARD_USER: Then the confirmation header is displayed', function () {
      cy.get(checkoutCompletePage.header).should('be.visible');
    });
  });

  context('CheckoutCompletePage.STANDARD_USER: When user clicks "Back Home"', function () {
    before(function () {
      cy.get(checkoutCompletePage.backHomeButton).click();
    });
    it('CheckoutCompletePage.Navigation.STANDARD_USER: Then the user navigates back to the Inventory page', function () {
      cy.url().should('include', appUrls.homePage);
    });
  });
});
