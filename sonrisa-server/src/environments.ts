require('dotenv').config();

export const environments = {
  development: {
    SQUARE_APP_ID: process.env.SQUARE_APP_ID_DEV,
    SQUARE_LOCATION_ID: process.env.SQUARE_LOCATION_ID_DEV,
  },
  production: {
    SQUARE_APP_ID: process.env.SQUARE_APP_ID_DEV,
    SQUARE_LOCATION_ID: process.env.SQUARE_LOCATION_ID_DEV,
  },
  test: {
    SQUARE_APP_ID: process.env.SQUARE_APP_ID_DEV,
    SQUARE_LOCATION_ID: process.env.SQUARE_LOCATION_ID_DEV,
  },
};
