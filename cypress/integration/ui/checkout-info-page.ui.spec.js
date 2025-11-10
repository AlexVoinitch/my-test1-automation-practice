describe(
  'CheckoutInfoPage: Given a user is on the Checkout Step One page',
  { testIsolation: false },
  function () {
    before(function () {
      this.user = Cypress.env('StandardUser')
      this.checkoutData = Cypress.env('CheckoutData')

      cy.clearLocalStorage()
      cy.visit(urls.loginPage)
      cy.login(this.user.username, this.user.password)
      cy.get(inventoryPage.addToCartButton).first().click()
      cy.get(inventoryPage.cartBadge).click()
      cy.get(cartPage.checkoutButton).click()
      cy.url().should('include', 'checkout-step-one.html')
    })

    context(
      'CheckoutInfoPage: When user enters valid shipping information',
      function () {
        before(function () {
          const data = this.checkoutData
          cy.get(checkoutInfoPage.firstNameInput).type(data.firstName)
          cy.get(checkoutInfoPage.lastNameInput).type(data.lastName)
          cy.get(checkoutInfoPage.postalCodeInput).type(data.postalCode)
          cy.get(checkoutInfoPage.continueButton).click()
        })

        it('CheckoutInfoPage.FillForm: Then user is redirected to the Checkout Step Two page', function () {
          cy.url().should('include', 'checkout-step-two.html')
        })
      }
    )
  }
)
