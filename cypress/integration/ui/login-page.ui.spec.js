describe(
  'LoginPage: Given valid and invalid user credentials are available',
  { testIsolation: false },
  function () {
    beforeEach(function () {
      cy.visit(urls.loginPage)
    })
    context(
      'LoginPage.STANDARD_USER: When logging in with valid credentials',
      function () {
        beforeEach(function () {
          const user = Cypress.env('StandardUser')
          const username = user.username
          const password = user.password
          cy.login(username, password)
        })

        it('LoginPage.STANDARD_USER: Then user is redirected to products page', () => {
          cy.url().should('include', urls.homePage)
        })

        it('LoginPage.STANDARD_USER: Then product list title is visible', () => {
          cy.get(homePage.title)
            .should('be.visible')
            .and('have.text', l10n.productsPage.title)
        })
      }
    )

    context(
      'LoginPage.INVALID_USER: When logging in with invalid username',
      () => {
        it.skip('LoginPage.INVALID_USER: Then error is shown for invalid credentials', () => {
          // ... (Not implemented yet)
        })
      }
    )

    context(
      'LoginPage.INVALID_PASSWORD: When logging in with invalid password',
      () => {
        it.skip('LoginPage.INVALID_PASSWORD: Then error is shown for invalid credentials', () => {
          // ... (Not implemented yet)
        })
      }
    )

    context(
      'LoginPage.LOCKED_OUT_USER: When logging in as a locked user',
      () => {
        it.skip('LoginPage.LOCKED_OUT_USER: Then error is shown for locked user', () => {
          // ... (Not implemented yet)
        })
      }
    )

    context(
      'LoginPage.EMPTY_FIELDS: When logging in with empty fields',
      function () {
        it.skip('LoginPage.EMPTY_FIELDS: Then error is shown for missing username', () => {
          // ... (Not implemented yet)
        })

        it.skip('LoginPage.EMPTY_FIELDS: Then error is shown for missing password', () => {
          // ... (Not implemented yet)
        })
      }
    )
  }
)
