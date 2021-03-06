declare namespace NodeJS {
  // Merge the existing `ProcessEnv` definition with ours
  // https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-interfaces
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';

    SQUARE_ACCESS_TOKEN_DEV: string;

    SQUARE_ACCESS_TOKEN_PROD: string;

    SQUARE_APP_ID_DEV: string;

    SQUARE_APP_ID_PROD: string;

    SQUARE_LOCATION_ID_DEV: string;

    SQUARE_LOCATION_ID_PROD: string;

    GMAIL_CLIENT_ID: string;

    GMAIL_CLIENT_SECRET: string;

    GMAIL_OAUTH_REDIRECT_URI: string;

    GMAIL_OAUTH_REFRESH_TOKEN: string;

    SONRISA_EMAIL: string;

    INSTAGRAM_TOKEN: string;

    MONGODB_URI: string;
  }
}
