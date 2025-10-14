describe('E2E Flow: Checkout Info Page', { testIsolation: false }, function () {
  // Хук для загрузки данных (будет доступен this.userData)
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
  })

  context('Enter user information', function () {
    it('CheckoutInfo.FillForm: User enters shipping information', function () {
      const checkout = this.userData.checkoutData

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

      // Проверка навигации
      cy.url().should('include', 'checkout-step-two.html')
    })
  })
})
