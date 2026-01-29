// cypress/support/test-data/booking-data.js

export const bookingData = {
  dynamicData: {
    newBookingId: null,
  },
  validBookingData: {
    firstname: 'Alexei',
    lastname: 'Voinitch',
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-01-26', // negative - checkout first then checkin
      checkout: '2026-01-29',
    },
    additionalneeds: 'Breakfast',
  },
  invalidDatesBooking: {
    firstname: 'Alexei',
    lastname: 'Voinitch',
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-01-29',
      checkout: '2026-01-26',
    },
    additionalneeds: 'Breakfast',
  },
  updatedBookingData: {
    firstname: 'Jane',
  },
};
