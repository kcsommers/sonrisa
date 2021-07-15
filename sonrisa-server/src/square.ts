import { Client, Environment } from 'square';
import { environments } from './environments';
require('dotenv').config();

export const square = new Client({
  environment:
    process.env.NODE_ENV === 'production'
      ? Environment.Production
      : Environment.Sandbox,
  accessToken: environments[process.env.NODE_ENV].SQUARE_ACCESS_TOKEN,
});
