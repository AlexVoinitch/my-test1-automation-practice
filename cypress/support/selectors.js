// cypress/support/selectors.js

const loginPage = {
  usernameInput: '[data-test="username"]',
  passwordInput: '[data-test="password"]',
  loginButton: '[data-test="login-button"]',
  errorMessage: '[data-test="error-button"]',
}

const homePage = {
  title: '.title',
}

const inventoryPage = {
  headerContainer: '.header_container',
  title: '.title',
  sortDropdown: '[data-test="product-sort-container"]', // TODO: link to the Bug -> https://github.com/AlexVoinitch/my-test1-automation-practice/issues/10
  inventoryItem: '.inventory_item',
  addToCartButton: '.btn_primary',
  removeButton: '.btn_secondary',
  cartBadge: '.shopping_cart_badge',
  sidebarButton: '#react-burger-menu-btn',
  logout: '#logout_sidebar_link',
}

const cartPage = {
  cartItem: '.cart_item',
  checkoutButton: '[data-test="checkout"]',
}

export default {
  cartPage,
  inventoryPage,
  loginPage,
  homePage,
}
