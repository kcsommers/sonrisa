require('dotenv').config();

export const environments = {
  development: {
    SQUARE_APP_ID: process.env.SQUARE_APP_ID_DEV,
    SQUARE_LOCATION_ID: process.env.SQUARE_LOCATION_ID_DEV,
    GMAIL_CLIENT_ID: process.env.GMAIL_CLIENT_ID,
    GMAIL_CLIENT_SECRET: process.env.GMAIL_CLIENT_SECRET,
    GMAIL_OAUTH_REDIRECT_URI: process.env.GMAIL_OAUTH_REDIRECT_URI,
    GMAIL_OAUTH_REFRESH_TOKEN: process.env.GMAIL_OAUTH_REFRESH_TOKEN,
    SONRISA_EMAIL: process.env.SONRISA_EMAIL,
    INSTAGRAM_TOKEN: process.env.INSTAGRAM_TOKEN_DEV,
  },
  production: {
    SQUARE_APP_ID: process.env.SQUARE_APP_ID_DEV,
    SQUARE_LOCATION_ID: process.env.SQUARE_LOCATION_ID_DEV,
    GMAIL_CLIENT_ID: process.env.GMAIL_CLIENT_ID,
    GMAIL_CLIENT_SECRET: process.env.GMAIL_CLIENT_SECRET,
    GMAIL_OAUTH_REDIRECT_URI: process.env.GMAIL_OAUTH_REDIRECT_URI,
    GMAIL_OAUTH_REFRESH_TOKEN: process.env.GMAIL_OAUTH_REFRESH_TOKEN,
    SONRISA_EMAIL: process.env.SONRISA_EMAIL,
    INSTAGRAM_TOKEN: process.env.INSTAGRAM_TOKEN_DEV,
  },
  test: {
    SQUARE_APP_ID: process.env.SQUARE_APP_ID_DEV,
    SQUARE_LOCATION_ID: process.env.SQUARE_LOCATION_ID_DEV,
    GMAIL_CLIENT_ID: process.env.GMAIL_CLIENT_ID,
    GMAIL_CLIENT_SECRET: process.env.GMAIL_CLIENT_SECRET,
    GMAIL_OAUTH_REDIRECT_URI: process.env.GMAIL_OAUTH_REDIRECT_URI,
    GMAIL_OAUTH_REFRESH_TOKEN: process.env.GMAIL_OAUTH_REFRESH_TOKEN,
    SONRISA_EMAIL: process.env.SONRISA_EMAIL,
    INSTAGRAM_TOKEN: process.env.INSTAGRAM_TOKEN_DEV,
  },
};
