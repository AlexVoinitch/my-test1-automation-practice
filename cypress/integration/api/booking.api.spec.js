// cypress/integration/api/booking.api.spec.js

import { bookingData } from '../../support/test-data/booking-data';

describe('Booking API: Given the Booking endpoint is available', function () {
  let idsForCleanUp = [];

  before(function () {
    cy.userManagement__getUserDataByRole(userRoles.ADMIN_API).then((userData) => {
      cy.auth__getToken(userData);
    });
  });

  after(function () {
    if (idsForCleanUp.length > 0) {
      idsForCleanUp.forEach((id) => {
        cy.booking__delete(id, { failOnStatusCode: false });
      });
    }
  });

  context('Booking.Booking.Create.POST: When valid information is provided', function () {
    it('Booking.Booking.Create.POST: Then the system should return 200 OK and all booking details should match', function () {
      cy.booking__create(bookingData.validBookingData).then((response) => {
        expect(response.status).to.eq(200);

        expect(response.body).to.have.property('bookingid').and.be.a('number');
        expect(response.body).to.have.property('booking').and.be.a('object');
        const newId = response.body.bookingid;
        bookingData.dynamicData.newBookingId = newId;
        idsForCleanUp.push(newId);
        expect(response.body.booking).to.deep.equal(bookingData.validBookingData);
      });
    });
  });

  context('Booking.Booking.GetList.GET: When user requests all booking IDs', function () {
    it('Booking.Booking.GetList.GET: Then the system should return 200 OK and a non-empty list containing the new ID', function () {
      cy.booking__getAllIds().then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        const isIdPresent = response.body.some((b) => b.bookingid === bookingData.dynamicData.newBookingId);
        expect(isIdPresent).to.be.true;
      });
    });
  });

  context('Booking.Booking.Create.POST: When invalid dates are provided (Checkout before Checkin)', function () {
    it('Booking.Booking.Create.POST: Then the system should return 200 OK (Known BUG: Issue #14)', function () {
      // TODO: link to the issue https://github.com/AlexVoinitch/my-test1-automation-practice/issues/14

      cy.booking__create(bookingData.invalidDatesBooking, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(200);

        if (response.body && response.body.bookingid) {
          idsForCleanUp.push(response.body.bookingid);
        }
      });
    });
  });

  context('Booking.Booking.GetDetails.GET: When user requests an existing booking by ID', function () {
    it('Booking.Booking.GetDetails.GET: Then the system should return 200 OK and match all test data fields', function () {
      cy.booking__getById(bookingData.dynamicData.newBookingId).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.totalprice).to.be.a('number');
        expect(response.body.depositpaid).to.be.a('boolean');
        expect(response.body).to.deep.equal(bookingData.validBookingData);
      });
    });
  });

  context('Booking.Booking.GetDetails.GET: When user requests a non-existent booking ID', function () {
    it('Booking.Booking.GetDetails.GET: Then the system should return 404 Not Found', function () {
      cy.booking__getById(-1, { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body).to.contain('Not Found');
      });
    });
  });

  context('Booking.Booking.FullUpdate.PUT: When performing full update on an existing booking', function () {
    it('Booking.Booking.FullUpdate.PUT: Then the system should return 200 OK and all fields should be updated', function () {
      const fullUpdateData = { ...bookingData.validBookingData, firstname: 'UpdatedFull', totalprice: 777 };

      cy.booking__fullUpdate(bookingData.dynamicData.newBookingId, fullUpdateData).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.deep.equal(fullUpdateData);
      });
    });
  });

  context('Booking.Booking.Update.PATCH: When performing a partial update on an existing booking', function () {
    it('Booking.Booking.Update.PATCH: Then the system should return 200 OK and show updated fields', function () {
      cy.booking__update(bookingData.dynamicData.newBookingId, bookingData.updatedBookingData).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.firstname).to.eq(bookingData.updatedBookingData.firstname);
        expect(response.body).to.have.property('lastname');
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
