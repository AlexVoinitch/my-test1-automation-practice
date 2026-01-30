// cypress/support/test-data/booking-data.js

const randomId = () => Math.floor(Math.random() * 1000);

export const bookingData = {
  dynamicData: {
    newBookingId: null,
  },

  validBookingData: {
    firstname: `Alexei${randomId()}`,
    lastname: `Voinitch${randomId()}`,
    totalprice: 100 + randomId(),
    depositpaid: true,
    bookingdates: {
      checkin: '2026-01-26',
      checkout: '2026-01-29',
    },
    additionalneeds: 'Breakfast',
  },

  invalidDatesBooking: {
    firstname: 'Bug',
    lastname: 'Tester',
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-12-31',
      checkout: '2026-01-01', // Negative: checkout before checkin
    },
    additionalneeds: 'None',
  },
  updatedBookingData: {
    firstname: `Jane${randomId()}`,
  },
};
