// cypress/integration/api/booking.api.spec.js

import { bookingData } from '../../support/test-data/booking-data';

describe('Booking API: Given the Booking endpoint is available', function () {
  before(function () {
    return cy.userManagement__getUserDataByRole(userRoles.ADMIN_API).then((userData) => {
      cy.auth__getToken(userData);
    });
  });

  context('Booking.Booking.PositiveScenarios', function () {
    it('Booking.Booking.Create.POST: Then the system should create a new record and return 200 OK', function () {
      cy.booking__create(bookingData.validBookingData).then((response) => {
        expect(response.status).to.eq(200);
        bookingData.dynamicData.newBookingId = response.body.bookingid;
        expect(response.body.booking.firstname).to.eq(bookingData.validBookingData.firstname);
      });
    });

    it('Booking.Booking.GetDetails.GET: Then the system should return 200 OK for an existing ID', function () {
      cy.booking__getById(bookingData.dynamicData.newBookingId).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.firstname).to.eq(bookingData.validBookingData.firstname);
      });
    });

    it('Booking.Booking.Update.PATCH: Then the system should return 200 OK and reflect the updated firstname', function () {
      cy.booking__update(bookingData.dynamicData.newBookingId, bookingData.updatedBookingData).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.firstname).to.eq(bookingData.updatedBookingData.firstname);
      });
    });

    it('Booking.Booking.Delete.DELETE: Then the system should return 201 Created for a successful deletion', function () {
      cy.booking__delete(bookingData.dynamicData.newBookingId).then((response) => {
        expect(response.status).to.eq(201);
      });
    });
  });

  context('Booking.Booking.NegativeScenarios', function () {
    it('Booking.Booking.Create.POST: Then the system should return 200 even with invalid dates (Known BUG)', function () {
      cy.booking__create(bookingData.invalidDatesBooking, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });

    it('Booking.Booking.GetDetails.GET: Then the system should return 404 Not Found for a non-existent ID', function () {
      cy.booking__getById(-1, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });

    it('Booking.Booking.VerifyDeletion.GET: Then the system should return 404 for a record that has been deleted', function () {
      cy.booking__getById(bookingData.dynamicData.newBookingId, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });
});
