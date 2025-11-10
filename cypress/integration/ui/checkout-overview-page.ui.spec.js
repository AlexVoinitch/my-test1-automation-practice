describe(
  'CheckoutOverviewPage: Given a user is on the Checkout Step Two (Overview) page',
  { testIsolation: false },
  function () {
    before(function () {
      this.user = Cypress.env('StandardUser')
      this.checkoutData = Cypress.env('CheckoutData')
      const data = this.checkoutData

      cy.clearLocalStorage()
      cy.visit(urls.loginPage)
      cy.login(this.user.username, this.user.password)

      cy.get(inventoryPage.addToCartButton).first().click()
      cy.get(inventoryPage.cartBadge).click()
      cy.get(cartPage.checkoutButton).click()
      cy.url().should('include', 'checkout-step-one.html')

      cy.get(checkoutInfoPage.firstNameInput).type(data.firstName)
      cy.get(checkoutInfoPage.lastNameInput).type(data.lastName)
      cy.get(checkoutInfoPage.postalCodeInput).type(data.postalCode)
      cy.get(checkoutInfoPage.continueButton).click()

      cy.url().should('include', 'checkout-step-two.html')
    })

    context(
      'CheckoutOverviewPage: When user verifies the order summary',
      function () {
        it('CheckoutOverviewPage.Verify: Then Item total price is displayed', function () {
          cy.get(checkoutOverviewPage.itemTotal).should(
            'contain',
            'Item total:'
          )
        })
      }
    )

    context('CheckoutOverviewPage: When user completes the order', function () {
      before(function () {
        cy.get(checkoutOverviewPage.finishButton).click()
      })

      it('CheckoutOverviewPage.Finish: Then user is redirected to the Checkout Complete page', function () {
        cy.url().should('include', 'checkout-complete.html')
      })
    })
  }
)
