describe(
  'CartPage: Given a standard user is logged in and has an item in the cart',
  { testIsolation: false },
  function () {
    before(function () {
      this.user = Cypress.env('StandardUser')
      cy.clearLocalStorage()
      cy.visit(urls.loginPage)
      cy.login(this.user.username, this.user.password)
      cy.url().should('include', urls.homePage)
    })

    context('CartPage: When an item is added to the cart', function () {
      before(function () {
        cy.get(inventoryPage.addToCartButton).first().click()
        cy.get(inventoryPage.cartBadge).should('have.text', '1')
        cy.get(inventoryPage.cartBadge).click()
      })

      it('CartPage: Then the user is redirected to the Cart page', function () {
        cy.url().should('include', urls.cartPage)
      })

      it('CartPage: Then the cart contains the correct number of items', function () {
        cy.get(cartPage.cartItem).should('have.length', 1)
      })

      context('CartPage: When user proceeds to Checkout', function () {
        before(function () {
          cy.get(cartPage.checkoutButton).click()
        })

        it('CartPage: Then user is redirected to the Checkout Step One page', function () {
          cy.url().should('include', 'checkout-step-one.html')
        })
      })
    })
  }
)
