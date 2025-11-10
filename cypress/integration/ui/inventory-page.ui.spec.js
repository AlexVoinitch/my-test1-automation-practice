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

      context(
        'InventoryPage: When the user views the product list',
        function () {
          it('InventoryPage: Then the product list title is visible', () => {
            cy.get(inventoryPage.title)
              .should('be.visible')
              .and('have.text', l10n.productsPage.title)
          })
          it('InventoryPage: Then the sort dropdown is displayed', () => {
            cy.get(inventoryPage.sortDropdown).should('be.visible')
          })
        }
      )

      context(
        'InventoryPage.Sorting: When sorting products by Name (Z to A)',
        function () {
          before(function () {
            cy.get(inventoryPage.sortDropdown).select('za')
          })

          it('InventoryPage.Sorting: Then the first product is sorted correctly', () => {
            cy.get(inventoryPage.inventoryItem)
              .first()
              .find('.inventory_item_name')
              .should('have.text', 'Test.allTheThings() T-Shirt (Red)')
          })
          it('InventoryPage.Sorting: Then the second product is sorted correctly', () => {
            cy.get(inventoryPage.inventoryItem)
              .eq(1)
              .find('.inventory_item_name')
              .should('have.text', 'Sauce Labs Onesie')
          })
        }
      )

      context('InventoryPage.Cart: When adding items to the cart', function () {
        before(function () {
          cy.clearLocalStorage()
          cy.visit(urls.homePage)
        })

        before(function () {
          cy.get(inventoryPage.addToCartButton).first().click()
        })

        it('Inventory.Cart: Then the Remove button is visible on the first item', () => {
          cy.get(inventoryPage.removeButton).first().should('be.visible')
        })
        it('Inventory.Cart: Then the cart badge number is one', () => {
          cy.get(inventoryPage.cartBadge).should('have.text', '1')
        })

        context('When a second item is added', function () {
          before(function () {
            cy.get(inventoryPage.addToCartButton).eq(1).click()
          })
          it('Inventory.Cart: Then the cart badge number is two', () => {
            cy.get(inventoryPage.cartBadge).should('have.text', '2')
          })
        })

        context('When the first item is removed', function () {
          before(function () {
            cy.get(inventoryPage.removeButton).first().click()
          })
          it('Inventory.Cart: Then the Add to Cart button is visible on the first item', () => {
            cy.get(inventoryPage.addToCartButton).first().should('be.visible')
          })
          it('Inventory.Cart: Then the cart badge no longer exists', () => {
            cy.get(inventoryPage.cartBadge).should('not.exist')
          })
        })
      })

      context('InventoryPage.Logout: When the user logs out', function () {
        before(function () {
          cy.get(inventoryPage.sidebarButton).click()
          cy.get(inventoryPage.logout).click()
        })

        it('Inventory.Logout: Then user is redirected to the login page', () => {
          cy.url().should('eq', Cypress.config('baseUrl') + urls.loginPage)
          cy.get(loginPage.loginButton).should('be.visible')
        })
      })
    })
  }
)
