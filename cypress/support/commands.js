// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
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
