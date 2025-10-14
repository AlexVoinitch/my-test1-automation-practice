describe(
  'LoginPage: Given valid and invalid user credentials are available',
  { testIsolation: false },
  function () {
    before(function () {
      cy.fixture('user-data').as('userData')
    })

    context(
      'LoginPage.STANDARD_USER: When logging in with valid credentials',
      function () {
        before(function () {
          const username = this.userData.testUsers.valid.username
          const password = this.userData.testUsers.valid.password

          cy.visit(cy.urls.loginPage)
          cy.login(username, password)
        })

        it('LoginPage.STANDARD_USER: Then user is redirected to products page', function () {
          cy.url().should('include', cy.urls.homePage)
        })

        it('LoginPage.STANDARD_USER: Then product list title is visible', function () {
          cy.get(cy.selectors.homePage.title)
            .should('be.visible')
            .and('have.text', cy.l10n.productsPage.title)
        })
      }
    )

    context(
      'LoginPage.INVALID_USER: When logging in with invalid username',
      function () {
        beforeEach(function () {
          const invalidUsername = this.userData.testUsers.invalid.username
          const validPassword = this.userData.testUsers.valid.password
          cy.visit(cy.urls.loginPage)
          cy.login(invalidUsername, validPassword)
        })

        it('LoginPage.INVALID_USER: Error is shown for invalid credentials', function () {
          cy.get(cy.selectors.loginPage.errorMessage).should(
            'have.text',
            cy.l10n.loginPage.loginFailedError
          )
        })
      }
    )

    context(
      'LoginPage.INVALID_PASSWORD: When logging in with invalid password',
      function () {
        beforeEach(function () {
          const validUsername = this.userData.testUsers.valid.username
          const invalidPassword = this.userData.testUsers.invalid.password
          cy.visit(cy.urls.loginPage)
          cy.login(validUsername, invalidPassword)
        })

        it('LoginPage.INVALID_PASSWORD: Error is shown for invalid credentials', function () {
          cy.get(cy.selectors.loginPage.errorMessage).should(
            'have.text',
            cy.l10n.loginPage.loginFailedError
          )
        })
      }
    )

    context(
      'LoginPage.LOCKED_OUT_USER: When logging in as a locked user',
      function () {
        beforeEach(function () {
          const lockedUsername = this.userData.testUsers.lockedOutUser.username
          const password = this.userData.testUsers.lockedOutUser.password

          cy.visit(cy.urls.loginPage)
          cy.login(lockedUsername, password)
        })

        it('LoginPage.LOCKED_OUT_USER: Error is shown for locked user', function () {
          cy.get(cy.selectors.loginPage.errorMessage).should('be.visible')
          cy.get(cy.selectors.loginPage.errorMessage).should(
            'have.text',
            cy.l10n.loginPage.lockedOutError
          )
        })
      }
    )

    context(
      'LoginPage.EMPTY_FIELDS: When logging in with empty fields',
      function () {
        beforeEach(function () {
          cy.visit(cy.urls.loginPage)
        })

        it('LoginPage.EMPTY_FIELDS: Error is shown for missing username', function () {
          const password = this.userData.testUsers.valid.password
          cy.get(cy.selectors.loginPage.passwordInput).type(password)
          cy.get(cy.selectors.loginPage.loginButton).click()

          cy.get(cy.selectors.loginPage.errorMessage).should(
            'have.text',
            cy.l10n.loginPage.missingUsernameError
          )
        })

        it('LoginPage.EMPTY_FIELDS: Error is shown for missing password', function () {
          const username = this.userData.testUsers.valid.username
          cy.get(cy.selectors.loginPage.usernameInput).type(username)
          cy.get(cy.selectors.loginPage.loginButton).click()

          cy.get(cy.selectors.loginPage.errorMessage).should(
            'have.text',
            cy.l10n.loginPage.missingPasswordError
          )
        })
      }
    )
  }
)
