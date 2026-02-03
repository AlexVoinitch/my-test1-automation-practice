// cypress/support/api/booking.api.commands.js

Cypress.Commands.add('booking__create', (bookingBody, options = {}) => {
  const { failOnStatusCode, ...restOptions } = options;

  return cy.request({
    ...restOptions,
    method: 'POST',
    url: `${API_URLS.BASE_URL}${API_URLS.ENDPOINTS.BOOKING}`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...restOptions.headers,
    },
    body: bookingBody,
    failOnStatusCode: failOnStatusCode,
  });
});

Cypress.Commands.add('booking__getAllIds', (options = {}) => {
  const { failOnStatusCode, ...restOptions } = options;

  return cy.request({
    ...restOptions,
    method: 'GET',
    url: `${API_URLS.BASE_URL}${API_URLS.ENDPOINTS.BOOKING}`,
    failOnStatusCode: failOnStatusCode,
  });
});

Cypress.Commands.add('booking__getById', (bookingId, options = {}) => {
  const { failOnStatusCode, ...restOptions } = options;

  return cy.request({
    ...restOptions,
    method: 'GET',
    url: `${API_URLS.BASE_URL}${API_URLS.ENDPOINTS.BOOKING}/${bookingId}`,
    headers: {
      Accept: 'application/json',
      ...restOptions.headers,
    },
    failOnStatusCode: failOnStatusCode,
  });
});

Cypress.Commands.add('booking__fullUpdate', (bookingId, fullBody, options = {}) => {
  const { failOnStatusCode, token: manualToken, ...restOptions } = options;
  const token = manualToken || Cypress.env('token');

  if (!token) throw new Error('Auth token is required for booking__fullUpdate');

  return cy.request({
    ...restOptions,
    method: 'PUT',
    url: `${API_URLS.BASE_URL}${API_URLS.ENDPOINTS.BOOKING}/${bookingId}`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Cookie: `token=${token}`,
      ...restOptions.headers,
    },
    body: fullBody,
    failOnStatusCode: failOnStatusCode,
  });
});

Cypress.Commands.add('booking__update', (bookingId, updateBody, options = {}) => {
  const { failOnStatusCode, token: manualToken, ...restOptions } = options;
  const token = manualToken || Cypress.env('token');

  if (!token) throw new Error('Auth token is required for booking__update');

  return cy.request({
    ...restOptions,
    method: 'PATCH',
    url: `${API_URLS.BASE_URL}${API_URLS.ENDPOINTS.BOOKING}/${bookingId}`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Cookie: `token=${token}`,
      ...restOptions.headers,
    },
    body: updateBody,
    failOnStatusCode: failOnStatusCode,
  });
});

Cypress.Commands.add('booking__delete', (bookingId, options = {}) => {
  const { failOnStatusCode, token: manualToken, ...restOptions } = options;
  const token = manualToken || Cypress.env('token');

  if (!token) throw new Error('Auth token is required for booking__delete');

  return cy.request({
    ...restOptions,
    method: 'DELETE',
    url: `${API_URLS.BASE_URL}${API_URLS.ENDPOINTS.BOOKING}/${bookingId}`,
    headers: {
      'Content-Type': 'application/json',
      Cookie: `token=${token}`,
      ...restOptions.headers,
    },
    failOnStatusCode: failOnStatusCode,
  });
});
