describe(
  'E2E Flow: Checkout Complete Page',
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

      cy.get(cy.selectors.loginPage.usernameInput).clear().type(user.username)
      cy.get(cy.selectors.loginPage.passwordInput).clear().type(user.password)

      cy.get(cy.selectors.loginPage.loginButton).click()
      cy.url().should('include', 'inventory.html')

      cy.get(cy.selectors.inventoryPage.addToCartButton).first().click()
      cy.get(cy.selectors.inventoryPage.cartBadge).click()
      cy.get(cy.selectors.cartPage.checkoutButton).click()
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
      cy.get(cy.selectors.checkoutOverviewPage.finishButton).click()
      cy.url().should('include', 'checkout-complete.html')
    })

    context('Verification of order completion', function () {
      it('CheckoutComplete.Verify: User sees confirmation message and navigates back to inventory', function () {
        cy.get(cy.selectors.checkoutCompletePage.header).should('be.visible')
      })
    })
  }
)
