// cypress/support/test-data/booking-data.js

export const bookingData = {
  validBookingData: {
    firstname: 'Alexei',
    lastname: 'Voinitch',
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-01-26',
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
      checkout: '2026-01-26', // negative - checkout first then checkin
    },
    additionalneeds: 'Breakfast',
  },
  updatedBookingData: {
    firstname: 'Jane',
    lastname: 'Smith',
    totalprice: 222,
    depositpaid: false,
    bookingdates: {
      checkin: '2026-04-15',
      checkout: '2026-04-25',
    },
    additionalneeds: 'Dinner and Lunch',
  },
};
