// cypress/support/api/booking.api.commands.js

Cypress.Commands.add('booking__create', (bookingBody, options = {}) => {
  return cy.request({
    method: 'POST',
    url: `${API_URLS.BASE_URL}${API_URLS.ENDPOINTS.BOOKING}`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: bookingBody,
    failOnStatusCode: options.failOnStatusCode ?? true,
    ...options,
  });
});

Cypress.Commands.add('booking__getAllIds', () => {
  return cy.request({
    method: 'GET',
    url: `${API_URLS.BASE_URL}${API_URLS.ENDPOINTS.BOOKING}`,
  });
});

Cypress.Commands.add('booking__getById', (bookingId, options = {}) => {
  return cy.request({
    method: 'GET',
    url: `${API_URLS.BASE_URL}${API_URLS.ENDPOINTS.BOOKING}/${bookingId}`,
    headers: {
      Accept: 'application/json',
    },
    failOnStatusCode: options.failOnStatusCode ?? true,
    ...options,
  });
});

Cypress.Commands.add('booking__fullUpdate', (bookingId, fullBody, options = {}) => {
  const token = options.token || Cypress.env('token');
  if (!token) throw new Error('Auth token is required for booking__fullUpdate');

  return cy.request({
    method: 'PUT',
    url: `${API_URLS.BASE_URL}${API_URLS.ENDPOINTS.BOOKING}/${bookingId}`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Cookie: `token=${token}`,
    },
    body: fullBody,
    failOnStatusCode: options.failOnStatusCode ?? true,
  });
});

Cypress.Commands.add('booking__update', (bookingId, updateBody, options = {}) => {
  const token = options.token || Cypress.env('token');
  if (!token) throw new Error('Auth token is required for booking__update');

  return cy.request({
    method: 'PATCH',
    url: `${API_URLS.BASE_URL}${API_URLS.ENDPOINTS.BOOKING}/${bookingId}`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Cookie: `token=${token}`,
    },
    body: updateBody,
    failOnStatusCode: options.failOnStatusCode ?? true,
  });
});

Cypress.Commands.add('booking__delete', (bookingId, options = {}) => {
  const token = options.token || Cypress.env('token');
  if (!token) throw new Error('Auth token is required for booking__delete');

  return cy.request({
    method: 'DELETE',
    url: `${API_URLS.BASE_URL}${API_URLS.ENDPOINTS.BOOKING}/${bookingId}`,
    headers: {
      'Content-Type': 'application/json',
      Cookie: `token=${token}`,
    },
    failOnStatusCode: options.failOnStatusCode ?? true,
  });
});
