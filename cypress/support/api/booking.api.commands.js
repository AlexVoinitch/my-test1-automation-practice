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
    ...options,
  });
});

Cypress.Commands.add('booking__getById', (bookingId, options = {}) => {
  return cy.request({
    method: 'GET',
    url: `${API_URLS.BASE_URL}${API_URLS.ENDPOINTS.BOOKING}/${bookingId}`,
    headers: {
      Accept: 'application/json',
    },
    ...options,
  });
});

Cypress.Commands.add('booking__update', (bookingId, updateBody, token) => {
  const authToken = token || Cypress.env('authToken');

  if (!authToken) throw new Error('Auth token is required for booking__update');

  return cy.request({
    method: 'PATCH',
    url: `${API_URLS.BASE_URL}${API_URLS.ENDPOINTS.BOOKING}/${bookingId}`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Cookie: `token=${authToken}`,
    },
    body: updateBody,
  });
});

Cypress.Commands.add('booking__delete', (bookingId, token) => {
  const authToken = token || Cypress.env('authToken');

  if (!authToken) throw new Error('Auth token is required for booking__delete');

  return cy.request({
    method: 'DELETE',
    url: `${API_URLS.BASE_URL}${API_URLS.ENDPOINTS.BOOKING}/${bookingId}`,
    headers: {
      'Content-Type': 'application/json',
      Cookie: `token=${authToken}`,
    },
  });
});
