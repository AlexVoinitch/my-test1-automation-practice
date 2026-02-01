// cypress/support/api/booking.api.commands.js

import { ENDPOINTS } from '../constants/api-urls';

Cypress.Commands.add('booking__create', (bookingBody, options = {}) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('apiBaseUrl')}${ENDPOINTS.BOOKING}`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: bookingBody,
    ...options,
  });
});

Cypress.Commands.add('booking__getById', (bookingId, options = {}) => {
  return cy.request({
    method: 'GET',
    url: `${Cypress.env('apiBaseUrl')}${ENDPOINTS.BOOKING}/${bookingId}`,
    headers: {
      Accept: 'application/json',
    },
    ...options,
  });
});

Cypress.Commands.add('booking__update', (bookingId, updateBody, token = Cypress.env('authToken')) => {
  return cy.request({
    method: 'PATCH',
    url: `${Cypress.env('apiBaseUrl')}${ENDPOINTS.BOOKING}/${bookingId}`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Cookie: `token=${token}`,
    },
    body: updateBody,
  });
});

Cypress.Commands.add('booking__delete', (bookingId, token = Cypress.env('authToken')) => {
  return cy.request({
    method: 'DELETE',
    url: `${Cypress.env('apiBaseUrl')}${ENDPOINTS.BOOKING}/${bookingId}`,
    headers: {
      'Content-Type': 'application/json',
      Cookie: `token=${token}`,
    },
  });
});
