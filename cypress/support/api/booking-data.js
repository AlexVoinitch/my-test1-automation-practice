// cypress/support/api/booking-data.js

const defaultBooking = {
  firstname: 'Alexei',
  lastname: 'Voinitch',
  totalprice: 111,
  depositpaid: true,
  bookingdates: {
    checkin: '2025-01-01',
    checkout: '2025-01-05',
  },
  additionalneeds: 'Breakfast',
};

export default defaultBooking;
