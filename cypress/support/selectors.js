export const loginPage = {
    usernameInput: '[data-test="username"]',
    passwordInput: '#password',
    loginButton: '[data-test="login-button"]',
    errorMessage: '[data-test="error"]',
  };
  
  // Add selectors for other pages and components as needed
  export const homePage = {
    productTitle: '.title',
    inventoryItem: '.inventory_item',
    addToCartButton: '[data-test^="add-to-cart"]',
    shoppingCartLink: '.shopping_cart_link',
  };
  
  export const cartPage = {
    cartItem: '.cart_item',
    checkoutButton: '[data-test="checkout"]',
  };
  
  // ... and so on