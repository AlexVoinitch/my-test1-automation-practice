describe('E2E Flow: Cart Page', { testIsolation: false }, function () {
  before(function () {
    cy.fixture('user-data').as('userData')
  })

  before(function () {
    cy.clearLocalStorage()
    const user = this.userData.testUsers.valid

    cy.visit(cy.urls.loginPage)
    cy.login(user.username, user.password)
    cy.url().should('include', cy.urls.homePage)
  })

  context('Setup: Add item to cart', function () {
    it('Cart.Setup: Adds one item and navigates to the Cart page', function () {
      cy.get(cy.selectors.inventoryPage.addToCartButton).first().click()
      cy.get(cy.selectors.inventoryPage.cartBadge).should('have.text', '1')

      cy.get(cy.selectors.inventoryPage.cartBadge).click()
      cy.url().should('include', cy.urls.cartPage)
    })
  })

  context('Cart interactions', function () {
    it('Cart.Interactions: User verifies item and proceeds to Checkout', function () {
      cy.get(cy.selectors.cartPage.cartItem).should('have.length', 1)
      cy.get(cy.selectors.cartPage.checkoutButton).click()
      cy.url().should('include', 'checkout-step-one.html')
    })
  })
})
