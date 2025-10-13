describe(
  'InventoryPage: Standard user is logged in',
  { testIsolation: false },
  () => {
    before(function () {
      cy.fixture('user-data').as('userData')
    })

    before(function () {
      const username = this.userData.testUsers.valid.username
      const password = this.userData.testUsers.valid.password

      cy.visit(cy.urls.loginPage)
      cy.login(username, password)

      cy.url().should('include', cy.urls.homePage)

      cy.get(cy.selectors.inventoryPage.sortDropdown).should('be.visible')
    })

    context('Filtering products', () => {
      it('Inventory.Sorting: Products are sorted correctly by Name (Z to A)', () => {
        cy.get(cy.selectors.inventoryPage.sortDropdown).select('za')

        cy.get(cy.selectors.inventoryPage.inventoryItem)
          .first()
          .find('.inventory_item_name')
          .should('have.text', 'Test.allTheThings() T-Shirt (Red)')

        cy.get(cy.selectors.inventoryPage.inventoryItem)
          .eq(1)
          .find('.inventory_item_name')
          .should('have.text', 'Sauce Labs Onesie')
      })
    })
    //
    context('Adding and verifying items in the cart', () => {
      beforeEach(function () {
        cy.clearLocalStorage()
        const userData = this.userData.testUsers.valid
        cy.visit(cy.urls.loginPage)
        cy.login(userData.username, userData.password)
        cy.url().should('include', cy.urls.homePage)
      })

      it('Inventory.Cart: User can add item to cart and badge updates', () => {
        cy.get(cy.selectors.inventoryPage.addToCartButton).first().click()
        cy.get(cy.selectors.inventoryPage.removeButton)
          .first()
          .should('be.visible')
        cy.get(cy.selectors.inventoryPage.cartBadge).should('have.text', '1')

        cy.get(cy.selectors.inventoryPage.addToCartButton).eq(1).click()
        cy.get(cy.selectors.inventoryPage.cartBadge).should('have.text', '2')
      })

      it('Inventory.Cart: User can remove item from the cart', () => {
        cy.get(cy.selectors.inventoryPage.addToCartButton).first().click()
        cy.get(cy.selectors.inventoryPage.cartBadge).should('have.text', '1')
        cy.get(cy.selectors.inventoryPage.removeButton).first().click()

        cy.get(cy.selectors.inventoryPage.addToCartButton)
          .first()
          .should('be.visible')

        cy.get(cy.selectors.inventoryPage.cartBadge).should('not.exist')
      })
    })

    context('Logout functionality', () => {
      it('Inventory.Logout: User can successfully logout and return to login page', () => {
        cy.get(cy.selectors.inventoryPage.sidebarButton).click()
        cy.get('#logout_sidebar_link').click()
        cy.url().should('eq', Cypress.config('baseUrl') + cy.urls.loginPage)
        cy.get(cy.selectors.loginPage.loginButton).should('be.visible')
      })
    })
  }
)
