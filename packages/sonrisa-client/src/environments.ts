export const environments = {
  development: {
    API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL_DEV,
    SQUARE_APP_ID: process.env.NEXT_PUBLIC_SQUARE_APP_ID_DEV,
    SQUARE_LOCATION_ID: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID_DEV,
    SQUARE_ACCESS_TOKEN: process.env.NEXT_PUBLIC_SQUARE_ACCESS_TOKEN_DEV,
    SQUARE_ORDERS_BASE_URL:
      'https://squareupsandbox.com/dashboard/orders/overview',
  },
  production: {
    API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL_PROD,
    SQUARE_APP_ID: process.env.NEXT_PUBLIC_SQUARE_APP_ID_PROD,
    SQUARE_LOCATION_ID: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID_PROD,
    SQUARE_ACCESS_TOKEN: process.env.NEXT_PUBLIC_SQUARE_ACCESS_TOKEN_PROD,
    SQUARE_ORDERS_BASE_URL: 'https://squareup.com/dashboard/orders/overview',
  },
  test: {
    API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL_DEV,
    SQUARE_APP_ID: process.env.NEXT_PUBLIC_SQUARE_APP_ID_DEV,
    SQUARE_LOCATION_ID: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID_DEV,
    SQUARE_ACCESS_TOKEN: process.env.NEXT_PUBLIC_SQUARE_ACCESS_TOKEN_DEV,
    SQUARE_ORDERS_BASE_URL:
      'https://squareupsandbox.com/dashboard/orders/overview',
  },
};
