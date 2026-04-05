import { Client, Environment } from 'square';
import env from './environment';

export const square = new Client({
  environment:
    env.NODE_ENV === 'production'
      ? Environment.Production
      : Environment.Sandbox,
  accessToken: env.SQUARE_ACCESS_TOKEN,
});
