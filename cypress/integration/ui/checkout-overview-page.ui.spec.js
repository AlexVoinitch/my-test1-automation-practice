describe(
  'E2E Flow: Checkout Overview Page',
  { testIsolation: false },
  function () {
    before(function () {
      cy.fixture('user-data').as('userData')
    })

    before(function () {
      cy.clearLocalStorage()
      const user = this.userData.testUsers.valid
      const checkout = this.userData.checkoutData
      cy.visit(cy.urls.loginPage)
      cy.login(user.username, user.password)
      cy.get(cy.selectors.inventoryPage.addToCartButton).first().click()
      cy.get(cy.selectors.inventoryPage.cartBadge).click()
      cy.get(cy.selectors.cartPage.checkoutButton).click()
      cy.url().should('include', 'checkout-step-one.html')
      cy.get(cy.selectors.checkoutInfoPage.firstNameInput).type(
        checkout.firstName
      )
      cy.get(cy.selectors.checkoutInfoPage.lastNameInput).type(
        checkout.lastName
      )
      cy.get(cy.selectors.checkoutInfoPage.postalCodeInput).type(
        checkout.postalCode
      )
      cy.get(cy.selectors.checkoutInfoPage.continueButton).click()

      cy.url().should('include', 'checkout-step-two.html')
    })

    context('Order review and completion', function () {
      it('CheckoutOverview.Verify: User verifies total price and completes order', function () {
        cy.get(cy.selectors.checkoutOverviewPage.itemTotal).should(
          'contain',
          'Item total:'
        )
        cy.get(cy.selectors.checkoutOverviewPage.finishButton).click()
        cy.url().should('include', 'checkout-complete.html')
      })
    })
  }
)
