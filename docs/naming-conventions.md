# Naming Conventions

This document outlines the naming conventions used for pages and components within this application. Consistent naming
makes the codebase easier to understand and maintain.

## Pages

Page objects should be named using PascalCase and should clearly indicate the page they represent. For example:

* `LoginPage`
* `HomePage`
* `ProductDetailsPage`
* `CheckoutInformationPage`

The corresponding Cypress test files for these pages should follow the pattern: `<page-name>.ui.spec.js`, e.g.,
`login-page.ui.spec.js`.

## Components

Component names should also use PascalCase to distinguish them from HTML elements. Examples:

* `NavigationBar`
* `ProductCard`
* `ShoppingCartItem`
* `ModalDialog`

When referencing components in Cypress selectors, use descriptive names that reflect the component's purpose.

## Selectors

Selectors in `cypress/support/selectors.js` should be named using camelCase and should be specific enough to uniquely
identify the element. Group selectors by page or component. For example:

## API Testing Conventions

### 1. File Naming

* **Format:** `[endpointName].api.spec.js`
* **Example:** `ping.api.spec.js`, `booking.api.spec.js`

### 2. Custom Command Naming

* **Format:** `[entity]__[action]` (Domain-Driven Naming)
* **Rule:** Avoid technical prefixes like `api__`. Use double underscores to separate the entity from the action.
* **Usage:** Commands should encapsulate the `cy.request()` call, handle authentication, and return the response.
* **Examples:** `cy.booking__create()`, `cy.auth__getToken()`, `cy.booking__getById()`

### 3. Test Titles (Gherkin Style)

To make tests readable and descriptive, use the **Given / When / Then** approach:

* **Describe (Given):** The initial context or precondition.
  * *Example:* `describe('Booking API: Given the user has valid credentials', ...)`
* **Context (When):** The specific action or scenario being tested. Keep positive and negative scenarios in separate context blocks.
  * *Example:* `context('When the user attempts to create a booking with valid data', ...)`
* **It (Then):** The expected outcome.
  * *Example:* `it('Then the system should return 200 OK and the created booking ID', ...)`

### 4. Test Structure and Prefixing

Each test block must follow a strict hierarchy to ensure clarity in reports:

* **Prefix Format:** `[Module].[Endpoint].[Action].[Method]`
* **Context (When):** Use a separate `context` for EVERY `it` block. The title must describe the specific condition.
  * *Example:* `context('Booking.Booking.Create.Positive: When valid data is provided', ...)`
* **It (Then):** Describe the expected outcome.
  * *Example:* `it('Booking.Booking.Create.POST: Then the system should return 200 OK', ...)`

```javascript
export const loginPage = {
  usernameInput: '[data-test="username"]',
  passwordInput: '#password',
  loginButton: '.submit-button',
  errorMessage: '.error-message-container h3',
};

export const navigationBar = {
  cartButton: '#shopping_cart_container a',
  menuButton: '#react-burger-menu-btn',
  logoutLink: '#logout_sidebar_link',
};
