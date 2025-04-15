## Use this file to declare naming conventions for pages and components of the application.

# Naming Conventions

This document outlines the naming conventions used for pages and components within this application. Consistent naming makes the codebase easier to understand and maintain.

## Pages

Page objects should be named using PascalCase and should clearly indicate the page they represent. For example:

* `LoginPage`
* `HomePage`
* `ProductDetailsPage`
* `CheckoutInformationPage`

The corresponding Cypress test files for these pages should follow the pattern: `<page-name>.ui.spec.js`, e.g., `login-page.ui.spec.js`.

## Components

Component names should also use PascalCase to distinguish them from HTML elements. Examples:

* `NavigationBar`
* `ProductCard`
* `ShoppingCartItem`
* `ModalDialog`

When referencing components in Cypress selectors, use descriptive names that reflect the component's purpose.

## Selectors

Selectors in `cypress/support/selectors.js` should be named using camelCase and should be specific enough to uniquely identify the element. Group selectors by page or component. For example:

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