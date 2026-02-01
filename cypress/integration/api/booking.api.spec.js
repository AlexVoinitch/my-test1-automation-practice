// cypress/integration/api/booking.api.spec.js
import { bookingData } from '../../support/test-data/booking-data';

describe('Booking API: Given the Booking endpoint is available', function () {
  before(function () {
    cy.userManagement__getUserDataByRole(userRoles.ADMIN_API).then((userData) => {
      cy.auth__getToken(userData);
    });
  });

  context('Booking.Booking.Create.POST: When valid information is provided', function () {
    it('Booking.Booking.Create.POST: Then the system should return 200 OK and all booking details should match', function () {
      cy.booking__create(bookingData.validBookingData).then((response) => {
        expect(response.status).to.eq(200);
        bookingData.dynamicData.newBookingId = response.body.bookingid;
        const actualBooking = response.body.booking;
        const expectedBooking = bookingData.validBookingData;

        expect(actualBooking.firstname).to.eq(expectedBooking.firstname);
        expect(actualBooking.lastname).to.eq(expectedBooking.lastname);
        expect(actualBooking.totalprice).to.eq(expectedBooking.totalprice);
        expect(actualBooking.depositpaid).to.eq(expectedBooking.depositpaid);
        expect(actualBooking.bookingdates.checkin).to.eq(expectedBooking.bookingdates.checkin);
        expect(actualBooking.bookingdates.checkout).to.eq(expectedBooking.bookingdates.checkout);
        expect(actualBooking.additionalneeds).to.eq(expectedBooking.additionalneeds);
      });
    });
  });

  context('Booking.Booking.Create.POST: When invalid dates are provided (Checkout before Checkin)', function () {
    it('Booking.Booking.Create.POST: Then the system should return 200 OK (Known BUG: Issue #14)', function () {
      // TODO: link to the issue https://github.com/AlexVoinitch/my-test1-automation-practice/issues/14
      cy.booking__create(bookingData.invalidDatesBooking, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });

  context('Booking.Booking.GetDetails.GET: When user requests an existing booking by ID', function () {
    it('Booking.Booking.GetDetails.GET: Then the system should return 200 OK and match all test data fields', function () {
      cy.booking__getById(bookingData.dynamicData.newBookingId).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.deep.include(bookingData.validBookingData);
      });
    });
  });

  context('Booking.Booking.GetDetails.GET: When user requests a non-existent booking ID', function () {
    it('Booking.Booking.GetDetails.GET: Then the system should return 404 Not Found', function () {
      cy.booking__getById(-1, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });

  context('Booking.Booking.Update.PATCH: When performing a partial update on an existing booking', function () {
    it('Booking.Booking.Update.PATCH: Then the system should return 200 OK and show updated fields', function () {
      cy.booking__update(bookingData.dynamicData.newBookingId, bookingData.updatedBookingData).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.firstname).to.eq(bookingData.updatedBookingData.firstname);
      });
    });
  });

  context('Booking.Booking.Delete.DELETE: When user attempts to delete an existing booking', function () {
    it('Booking.Booking.Delete.DELETE: Then the system should return 201 Created for a successful deletion', function () {
      cy.booking__delete(bookingData.dynamicData.newBookingId).then((response) => {
        expect(response.status).to.eq(201);
      });
    });
  });

  context('Booking.Booking.VerifyDeletion.GET: When user requests a booking that has just been deleted', function () {
    it('Booking.Booking.VerifyDeletion.GET: Then the system should return 404 Not Found', function () {
      cy.booking__getById(bookingData.dynamicData.newBookingId, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });
});
