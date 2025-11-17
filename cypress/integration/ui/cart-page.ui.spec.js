describe('CartPage: Given a STANDARD_USER is logged in and has an item in the cart', { testIsolation: false }, function () {
  before(function () {
    cy.userManagement__getUserDataByRole(userRoles.STANDARD)
      .then((user) => {
        this.standardUser = user;
      })

      .then(() => {
        const standardUser = this.standardUser;

        cy.clearLocalStorage();
        cy.visit(appUrls.loginPage);

        cy.loginPage__login(standardUser);

        cy.url().should('include', appUrls.homePage);
      });
  });

  context('CartPage.STANDARD_USER: When an item is added to the cart', function () {
    before(function () {
      cy.get(inventoryPage.addToCartButton).first().click();
      cy.get(inventoryPage.cartBadge).should('have.text', '1');
      cy.get(inventoryPage.cartBadge).click();
    });

    it('CartPage.STANDARD_USER: Then the user is redirected to the Cart page', function () {
      cy.url().should('include', appUrls.cartPage);
    });

    it('CartPage.STANDARD_USER: Then the cart contains the correct number of items', function () {
      cy.get(cartPage.cartItem).should('have.length', 1);
    });

    context('CartPage.STANDARD_USER: When user proceeds to Checkout', function () {
      before(function () {
        cy.get(cartPage.checkoutButton).click();
      });

      it('CartPage.STANDARD_USER: Then user is redirected to the Checkout Step One page', function () {
        cy.url().should('include', 'checkout-step-one.html');
      });
    });
  });
});
