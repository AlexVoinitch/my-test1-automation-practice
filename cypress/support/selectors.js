// cypress/support/selectors.js
export const loginPage = {
  usernameInput: '[data-test="user-name"]',
  passwordInput: '[data-test="password"]',
  loginButton: '[data-test="login-button"]',
  errorMessage: '[data-test="error-button"]',
};

export const homePage = {
  productTitle: 'title', // Селектор для заголовка "Products" на домашней странице
  // Добавь другие селекторы для домашней страницы по мере необходимости
};