describe(
  'InventoryPage: Standard user is logged in',
  { testIsolation: false },
  function () {
    beforeEach(function () {
      const user = Cypress.env('StandardUser')
      cy.clearLocalStorage()
      cy.visit(cy.urls.loginPage)
      cy.login(user.username, user.password)
      cy.url().should('include', cy.urls.homePage)
    })

    it('Inventory.State: Should show product list title and sort dropdown', () => {
      cy.get(cy.selectors.inventoryPage.title)
        .should('be.visible')
        .and('have.text', cy.l10n.productsPage.title)
      cy.get(cy.selectors.inventoryPage.sortDropdown).should('be.visible')
    })

    context('Filtering products', function () {
      beforeEach(function () {
        cy.get(cy.selectors.inventoryPage.sortDropdown).select('za')
      })
      it('Inventory.Sorting: Products are sorted correctly by Name (Z to A)', () => {
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

    context('Adding and verifying items in the cart', function () {
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

    context('Logout functionality', function () {
      it('Inventory.Logout: User can successfully logout and return to login page', () => {
        cy.get(cy.selectors.inventoryPage.sidebarButton).click()
        cy.get('#logout_sidebar_link').click()

        cy.url().should('eq', Cypress.config('baseUrl') + cy.urls.loginPage)
        cy.get(cy.selectors.loginPage.loginButton).should('be.visible')
      })
    })
  }
)
