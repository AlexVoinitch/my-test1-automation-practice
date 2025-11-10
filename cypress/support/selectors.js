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
  sortDropdown: 'select[data-test="product-sort-container"]', // TODO: link to the Bug -> https://github.com/AlexVoinitch/my-test1-automation-practice/issues/10
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
  removeButton: '[data-test^="remove-"]',
  continueShoppingButton: '[data-test="continue-shopping"]',
}

const checkoutInfoPage = {
  firstNameInput: '[data-test="firstName"]',
  lastNameInput: '[data-test="lastName"]',
  postalCodeInput: '[data-test="postalCode"]',
  continueButton: '[data-test="continue"]',
}

const checkoutOverviewPage = {
  finishButton: '[data-test="finish"]',
  itemTotal: '.summary_subtotal_label',
  tax: '.summary_tax_label',
  total: '.summary_total_label',
}

const checkoutCompletePage = {
  header: '.complete-header',
  ponyExpressImage: '.pony_express',
  backHomeButton: '[data-test="back-to-products"]',
}

export default {
  loginPage,
  homePage,
  inventoryPage,
  cartPage,
  checkoutInfoPage,
  checkoutOverviewPage,
  checkoutCompletePage,
}
