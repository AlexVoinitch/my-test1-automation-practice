// cypress/support/constants/api-urls.js

export const BASE_URL = Cypress.env('API_BASE_URL') || 'https://restful-booker.herokuapp.com';

export const ENDPOINTS = {
  PING: '/ping',
  AUTH: '/auth',
  BOOKING: '/booking',
};
