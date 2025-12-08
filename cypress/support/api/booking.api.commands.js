// cypress/support/api/booking.api.commands.js

import { BASE_URL, ENDPOINTS } from './api-urls';

const defaultBooking = require('../../fixtures/booking-data.json').validBookingData;

Cypress.Commands.add('api__createBooking', (bookingBody = defaultBooking, options = {}) => {
  const defaultRequestOptions = {
    method: 'POST',
    url: `${BASE_URL}${ENDPOINTS.BOOKING}`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: bookingBody,
  };
  return cy.request({
    ...defaultRequestOptions,
    ...options,
  });
});

Cypress.Commands.add('api__getBookingById', (bookingId, options = {}) => {
  return cy.request({
    method: 'GET',
    url: `${BASE_URL}${ENDPOINTS.BOOKING}/${bookingId}`,
    headers: {
      Accept: 'application/json',
    },
    ...options, // for sending failOnStatusCode: false
  });
});

Cypress.Commands.add('api__updateBooking', (bookingId, updateBody) => {
  const token = Cypress.env('authToken');
  if (!token) throw new Error('Auth token not found in Cypress environment.');

  return cy.request({
    method: 'PATCH',
    url: `${BASE_URL}${ENDPOINTS.BOOKING}/${bookingId}`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Cookie: `token=${token}`,
    },
    body: updateBody,
  });
});

Cypress.Commands.add('api__deleteBooking', (bookingId) => {
  const token = Cypress.env('authToken');
  if (!token) throw new Error('Auth token not found in Cypress environment.');

  return cy.request({
    method: 'DELETE',
    url: `${BASE_URL}${ENDPOINTS.BOOKING}/${bookingId}`,
    headers: {
      'Content-Type': 'application/json',
      Cookie: `token=${token}`,
    },
  });
});
