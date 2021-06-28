import { Client, Environment } from 'square';
require('dotenv').config();

export const square = new Client({
  environment:
    process.env.NODE_ENV === 'production'
      ? Environment.Production
      : Environment.Sandbox,
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
});
