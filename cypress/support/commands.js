// cypress/support/commands.js

Cypress.Commands.add('loginPage__login', ({ username, password }) => {
  cy.get(loginPage.usernameInput).type(username);
  cy.get(loginPage.passwordInput).type(password);
  cy.get(loginPage.loginButton).click();
});

Cypress.Commands.add('userManagement__getUserDataByRole', (role) => {
  if (!Object.values(userRoles).includes(role)) {
    throw new Error(`Invalid user: ${role}`);
  }

  let user = Cypress.env(`${role}-data`);
  if (user) {
    cy.log(`User found in environment for role: ${role}`);
    return cy.wrap(user);
  }

  return cy.fixture(`./../sensitive-data/${Cypress.env('envName')}-users.json`).then((users) => {
    Cypress.env(`${role}-data`, users[role]);
    return cy.wrap(users[role]);
  });
});
