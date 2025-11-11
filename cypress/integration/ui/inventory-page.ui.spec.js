describe(
  'InventoryPage: Given Standard user is logged in',
  { testIsolation: false },
  function () {
    before(function () {
      this.user = Cypress.env('StandardUser')
      cy.clearLocalStorage()
      cy.visit(urls.loginPage)
    })

    context('InventoryPage: When user logged in', function () {
      before(function () {
        cy.login(this.user.username, this.user.password)
      })
      it('InventoryPage: Then product list title is displayed', () => {
        cy.get(inventoryPage.title)
          .should('be.visible')
          .and('have.text', l10n.productsPage.title)
      })
      it('InventoryPage: Then sort dropdown is displayed', () => {
        cy.get(inventoryPage.sortDropdown).should('be.visible')
      })
    })

    context(
      'InventoryPage.Sorting: When sorting by Name from Z to A',
      function () {
        before(function () {
          cy.get(inventoryPage.sortDropdown).select('za')
        })
        it('InventoryPage.Sorting: Then Products are sorted from Z to A', () => {
          cy.get(inventoryPage.inventoryItem)
            .first()
            .find('.inventory_item_name')
            .should('have.text', 'Test.allTheThings() T-Shirt (Red)')
          cy.get(inventoryPage.inventoryItem)
            .eq(1)
            .find('.inventory_item_name')
            .should('have.text', 'Sauce Labs Onesie')
        })
      }
    )

    context(
      'InventoryPage.STANDARD_USER: When adding items in the cart',
      function () {
        before(() => {
          cy.get(inventoryPage.addToCartButton).first().click()
        })
        it('Inventory.Cart: Then Remove button on the cart is displayed', () => {
          cy.get(inventoryPage.removeButton).first().should('be.visible')
        })
        it('Inventory.Cart: Then badge number on the cart icon is one', () => {
          cy.get(inventoryPage.cartBadge).should('have.text', '1')
        })
      }
    )

    context(
      'InventoryPage.STANDARD_USER: When adding second product to the cart',
      function () {
        before(function () {
          cy.get(inventoryPage.addToCartButton).eq(1).click()
        })
        it('Inventory.Cart: Then badge number on the cart icon is two', () => {
          cy.get(inventoryPage.cartBadge).should('have.text', '2')
        })
      }
    )

    context(
      'InventoryPage.STANDARD_USER: When user clicks remove button the first cart',
      function () {
        before(function () {
          cy.get(inventoryPage.removeButton).first().click()
        })
        it('Inventory.Cart: Then Add to Cart button on the first card is displayed', () => {
          cy.get(inventoryPage.addToCartButton).first().should('be.visible')
        })
        it('Inventory.Cart: Then badge number on the cart icon is one', () => {
          cy.get(inventoryPage.cartBadge).should('have.text', '1')
        })
      }
    )

    context.skip(
      'InventoryPage.STANDARD_USER: Logout functionality',
      function () {
        before(function () {
          cy.get(inventoryPage.sidebarButton).click()
          cy.get('#logout_sidebar_link').click()
        })
        it.skip('Inventory.Logout: User can successfully logout and return to login page', () => {
          cy.url().should('eq', Cypress.config('baseUrl') + urls.loginPage)
          cy.get(loginPage.loginButton).should('be.visible')
        })
      }
    )
  }
)
