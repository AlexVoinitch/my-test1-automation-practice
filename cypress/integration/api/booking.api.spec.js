// cypress/integration/api/booking.api.spec.js

import { bookingData } from '../../support/test-data/booking-data';

describe('Booking API: Given the Booking endpoint is available', function () {
  let newBookingId;

  before(function () {
    return cy.userManagement__getUserDataByRole(userRoles.ADMIN_API).then((userData) => {
      cy.auth__getToken(userData);
    });
  });

  context('When user attempts to create booking', function () {
    it('Then the system should create a new record and return 200 OK (Positive)', function () {
      cy.booking__create(bookingData.validBookingData).then((response) => {
        expect(response.status).to.eq(200);
        newBookingId = response.body.bookingid;
        expect(response.body.booking.firstname).to.eq(bookingData.validBookingData.firstname);
      });
    });

    it('Then the system should return 200 for invalid dates (Known BUG)', function () {
      const invalidBody = {
        ...bookingData.validBookingData,
        bookingdates: { checkin: '2026-01-29', checkout: '2026-01-26' },
      };
      cy.booking__create(invalidBody, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });

  context('When user requests details of a booking', function () {
    it('Then it should return 200 OK for an existing ID', function () {
      cy.booking__getById(newBookingId).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.firstname).to.eq(bookingData.validBookingData.firstname);
      });
    });

    it('Then it should return 404 Not Found for a non-existent ID', function () {
      cy.booking__getById(-1, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });

  context('When user performs a partial update (PATCH)', function () {
    it('Then it should return 200 OK and reflect the updated firstname', function () {
      const updateBody = { firstname: bookingData.updatedBookingData.firstname };
      cy.booking__update(newBookingId, updateBody).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.firstname).to.eq(bookingData.updatedBookingData.firstname);
      });
    });
  });

  context('When user deletes booking', function () {
    it('Then it return 201 status for a successful deletion', function () {
      cy.booking__delete(newBookingId).then((response) => {
        expect(response.status).to.eq(201);
      });
    });

    it('Then the system should return 404 Not Found for the deleted record', function () {
      cy.booking__getById(newBookingId, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });
});
