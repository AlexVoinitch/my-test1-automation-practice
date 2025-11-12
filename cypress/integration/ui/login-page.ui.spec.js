describe('LoginPage: Given valid and invalid user credentials are available', { testIsolation: false }, function () {
  let standardUser;
  let lockedUser;

  before(function () {
    cy.userManagement__getUserDataByRole(userRoles.STANDARD).then((user) => {
      standardUser = user;
    });
    cy.userManagement__getUserDataByRole(userRoles.LOCKED).then((user) => {
      lockedUser = user;
    });
  });

  context('LoginPage.STANDARD_USER: When logging in with invalid username', function () {
    before(function () {
      cy.visit(urls.loginPage);
      cy.loginPage__login({ username: 'userNotFound', password: standardUser.password });
    });
    it('LoginPage.STANDARD_USER: Error is shown for invalid credentials', function () {
      cy.get(loginPage.errorMessage).should('have.text', l10n.loginPage.loginFailedError);
    });
  });

  context('LoginPage.STANDARD_USER: When logging in with invalid password', function () {
    before(function () {
      cy.get(loginPage.usernameInput).clear();
      cy.get(loginPage.passwordInput).clear();
      cy.loginPage__login({ username: standardUser.username, password: 'invalidPassword' });
    });
    it('LoginPage.STANDARD_USER: Error is shown for invalid credentials', function () {
      cy.get(loginPage.errorMessage).should('have.text', l10n.loginPage.loginFailedError);
    });
  });

  context('LoginPage.STANDARD_USER: When logging in with empty fields', function () {
    before(function () {
      cy.get(loginPage.usernameInput).clear();
      cy.get(loginPage.passwordInput).clear();
      cy.get(loginPage.passwordInput).type(standardUser.password);
      cy.get(loginPage.loginButton).click();
    });
    it('LoginPage.STANDARD_USER: Error is shown for missing username', function () {
      cy.get(loginPage.errorMessage).should('have.text', l10n.loginPage.missingUsernameError);
    });
  });

  context('LoginPage.STANDARD_USER: When logging in with empty fields', function () {
    before(function () {
      cy.get(loginPage.passwordInput).clear();
      cy.get(loginPage.usernameInput).type(standardUser.username);
      cy.get(loginPage.loginButton).click();
    });
    it('LoginPage.STANDARD_USER: Error is shown for missing password', function () {
      cy.get(loginPage.errorMessage).should('have.text', l10n.loginPage.missingPasswordError);
    });
  });

  context('LoginPage.STANDARD_USER: When logging in with valid credentials', function () {
    before(function () {
      cy.get(loginPage.usernameInput).clear();
      cy.get(loginPage.passwordInput).clear();
      cy.loginPage__login(standardUser);
    });
    it('LoginPage.STANDARD_USER: Then user is redirected to products page', function () {
      cy.url().should('include', urls.homePage);
    });
    it('LoginPage.STANDARD_USER: Then product list title is visible', function () {
      cy.get(homePage.title).should('be.visible').and('have.text', l10n.productsPage.title);
    });
  });

  context('LoginPage.LOCKED_OUT_USER: When logging in as a locked user', function () {
    before(function () {
      cy.visit('/');
      cy.loginPage__login(lockedUser);
    });
    it('LoginPage.LOCKED_OUT_USER: Error is shown for locked user', function () {
      cy.get(loginPage.errorMessage).should('be.visible');
      cy.get(loginPage.errorMessage).should('have.text', l10n.loginPage.lockedOutError);
    });
  });
});
