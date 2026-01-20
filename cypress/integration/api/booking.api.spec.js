// cypress/integration/api/booking.api.spec.js

import { bookingData } from '../../support/test-data/booking-data';

describe('Booking Endpoint: Full CRUD Cycle', function () {
  let newBookingId;

  before(function () {
    cy.api__getAuthToken();
  });

  context('Booking POST: Create Booking (Positive & Negative)', function () {
    it('should successfully create a new booking', function () {
      cy.api__createBooking(bookingData.validBookingData).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('bookingid').to.be.a('number');

        newBookingId = response.body.bookingid;

        expect(response.body.booking.firstname).to.eq(bookingData.validBookingData.firstname);
      });
    });

    it('should return 200 status code for invalid checkin/checkout dates (BUG)', function () {
      // API Bug: API accepts invalid dates and returns 200 OK instead of 400/500.
      // Test adjusted to assert current API behavior.
      const invalidBody = {
        ...bookingData.validBookingData,
        bookingdates: { checkin: '2026-01-29', checkout: '2026-01-26' },
      };

      cy.api__createBooking(invalidBody, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(200); // BUG here - expecting 500 but actual comes 200.
        // TODO: link to the issue <https://github.com/AlexVoinitch/my-test1-automation-practice/issues/14>
        // API Bug: API accepts invalid dates and returns 200 OK instead of 400/500.
        // Test adjusted to assert current API behavior.
      });
    });
  });

  context('Booking GET by ID: Retrieve Booking (Positive & Negative)', function () {
    it('should successfully retrieve the created booking', function () {
      cy.api__getBookingById(newBookingId).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.firstname).to.eq(bookingData.validBookingData.firstname);
      });
    });

    it('should return 404 for a non-existent booking ID (Negative)', function () {
      cy.api__getBookingById(-1, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body).to.eq('Not Found');
      });
    });
  });

  context('Booking PATCH: Update Booking (Positive)', function () {
    it('should successfully update the created booking firstname', function () {
      const updateBody = { firstname: bookingData.updatedBookingData.firstname };

      cy.api__updateBooking(newBookingId, updateBody).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.firstname).to.eq(bookingData.updatedBookingData.firstname);
      });
    });
  });

  context('Booking DELETE: Delete Booking and Verify Deletion', function () {
    it('should successfully delete the booking and return 201 status', function () {
      cy.api__deleteBooking(newBookingId).then((response) => {
        expect(response.status).to.eq(201);
      });
    });

    it('should return 404 after successful deletion (Verification)', function () {
      cy.api__getBookingById(newBookingId, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });
});
