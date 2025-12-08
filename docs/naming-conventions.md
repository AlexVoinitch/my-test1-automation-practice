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

* **Format:** `api__[method][EntityName]`
* **Usage:** Commands should encapsulate the `cy.request()` call, handle authentication, and return the response.
* **Examples:** `cy.api__createBooking()`, `cy.api__getAuthToken()`, `cy.api__getBookingById()`

### 3. Test Titles (describe/context/it)

* **Describe:** Should indicate the main endpoint and functional focus.
    * *Example:* `Booking Endpoint: Full CRUD Cycle`
* **Context:** Should specify the request method and the action or scenario.
    * *Example (Positive):* `Booking POST: Create Booking`
    * *Example (Negative):* `Booking GET by ID: Retrieve Booking (Negative Scenarios)`
* **It:** Should clearly state the expected result (positive or negative).
    * *Example (Positive):* `should successfully update the created booking firstname`
    * *Example (Negative):* `should return 404 for a non-existent booking ID`

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
