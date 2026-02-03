// cypress/support/test-data/booking-data.js

const getRandomString = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const baseBooking = {
  firstname: `User${getRandomString(5)}`,
  lastname: `Test${getRandomString(5)}`,
  totalprice: getRandomNumber(1, 100000),
  depositpaid: Math.random() < 0.5,
  bookingdates: {
    checkin: '2026-01-26',
    checkout: '2026-01-29',
  },
  additionalneeds: `Feature-${getRandomString(4)}`,
};

export const bookingData = {
  dynamicData: {
    newBookingId: null,
    idsForCleanUp: [],
  },
  validBookingData: baseBooking,
  invalidDatesBooking: {
    ...baseBooking,
    firstname: `BugHunter${getRandomString(3)}`,
    bookingdates: {
      checkin: '2026-01-29',
      checkout: '2026-01-26',
    },
  },
  fullUpdateData: {
    ...baseBooking,
    firstname: 'UpdatedFull',
    totalprice: 777,
  },
  updatedBookingData: {
    firstname: `Updated${getRandomString(5)}`,
  },
};
