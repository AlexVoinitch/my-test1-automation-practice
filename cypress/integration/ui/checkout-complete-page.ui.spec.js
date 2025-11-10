describe(
  'CheckoutCompletePage: Given a user has successfully completed an order',
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

      cy.get(checkoutInfoPage.firstNameInput).type(data.firstName)
      cy.get(checkoutInfoPage.lastNameInput).type(data.lastName)
      cy.get(checkoutInfoPage.postalCodeInput).type(data.postalCode)
      cy.get(checkoutInfoPage.continueButton).click()

      cy.get(checkoutOverviewPage.finishButton).click()

      cy.url().should('include', 'checkout-complete.html')
    })

    context(
      'CheckoutCompletePage: When user is redirected to the confirmation page',
      function () {
        it('CheckoutCompletePage.Verify: Then the confirmation header is displayed', function () {
          cy.get(checkoutCompletePage.header).should('be.visible')
        })
      }
    )

    context('CheckoutCompletePage: When user clicks "Back Home"', function () {
      before(function () {
        cy.get(checkoutCompletePage.backHomeButton).click()
      })
      it('CheckoutCompletePage.Navigation: Then the user navigates back to the Inventory page', function () {
        cy.url().should('include', urls.homePage)
      })
    })
  }
)
