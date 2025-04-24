/// <reference types="cypress" />

describe('Login Page UI', { testIsolation: false }, () => {
  beforeEach(() => {
    cy.visit(cy.urls.loginPage)
  })

  context('As a user, I want to log in with valid credentials', () => {
    it('Given I am on the login page', () => {
      cy.url().should('eq', cy.urls.loginPage)
    })

    it('When I enter a valid username and password', () => {
      cy.get(cy.selectors.loginPage.usernameInput).type(cy.reqs.standardUsername)
      cy.get(cy.selectors.loginPage.passwordInput).type(cy.reqs.validPassword)
    })

    it('And I click the "Login" button', () => {
      cy.wait(1000);
      cy.get(cy.selectors.loginPage.loginButton).click()
    })


    it('Then I should be redirected to the home page', () => {
      cy.url().should('eq', cy.urls.homePage)
    })

    it('And I should see the product list', () => {
      cy.get(cy.selectors.homePage.productTitle).should('be.visible')
    })
  })

  context('As a user, I want to see an error message when I log in with invalid credentials', () => {
    it.skip('Given I am on the login page', () => {
      // Not implemented yet
    })

    it.skip('When I enter an invalid username and a valid password', () => {
      // Not implemented yet
    })

    it.skip('And I click the "Login" button', () => {
      // Not implemented yet
    })

    it.skip('Then I should see an error message indicating incorrect credentials', () => {
      // Not implemented yet
    })
  })

  context('As a user, I want to see an error message when I log in with a valid username and an invalid password', () => {
    it.skip('Given I am on the login page', () => {
      // Not implemented yet
    })

    it.skip('When I enter a valid username and an invalid password', () => {
      // Not implemented yet
    })

    it.skip('And I click the "Login" button', () => {
      // Not implemented yet
    })

    it.skip('Then I should see an error message indicating incorrect credentials', () => {
      // Not implemented yet
    })
  })

  context('As a locked-out user, I want to see a specific error message', () => {
    it.skip('Given I am on the login page', () => {
      // Not implemented yet
    })

    it.skip('When I enter the username of a locked-out user and any password', () => {
      // Not implemented yet
    })

    it.skip('And I click the "Login" button', () => {
      // Not implemented yet
    })

    it.skip('Then I should see an error message indicating that the user is locked out', () => {
      // Not implemented yet
    })
  })

  context('As a user, I want to see an error message when I try to log in with empty fields', () => {
    it.skip('Given I am on the login page', () => {
      // Not implemented yet
    })

    it.skip('When I leave the username and password fields empty', () => {
      // Not implemented yet
    })

    it.skip('And I click the "Login" button', () => {
      // Not implemented yet
    })

    it.skip('Then I should see an error message indicating that the username is required', () => {
      // Not implemented yet
    })

    it.skip('And I should see an error message indicating that the password is required', () => {
      // Not implemented yet
    })
  })
})