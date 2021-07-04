import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import { Customer } from 'square';
import { environments } from '../../environments';

const oAuth2Client = new google.auth.OAuth2(
  environments[process.env.NODE_ENV].GMAIL_CLIENT_ID,
  environments[process.env.NODE_ENV].GMAIL_CLIENT_SECRET,
  environments[process.env.NODE_ENV].GMAIL_OAUTH_REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: environments[process.env.NODE_ENV].GMAIL_OAUTH_REFRESH_TOKEN,
});

export const sendEmail = async (customer: Customer) => {
  try {
    const _accessToken = await oAuth2Client.getAccessToken();

    const _transport = (nodemailer as any).createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'kacysommers@gmail.com',
        clientId: environments[process.env.NODE_ENV].GMAIL_CLIENT_ID,
        clientSecret: environments[process.env.NODE_ENV].GMAIL_CLIENT_SECRET,
        refreshToken:
          environments[process.env.NODE_ENV].GMAIL_OAUTH_REFRESH_TOKEN,
        accessToken: _accessToken,
      },
    });

    const _mailOptions = {
      from: 'Sonrisa Donuts <kacysommers@gmail.com>',
      to: customer.emailAddress,
      subject: 'Thank you for your order!',
      text: 'Your order has been placed.',
      html: '<h1>Your order has been placed.</h1>',
    };

    const _result = await _transport.sendMail(_mailOptions);

    return _result;
  } catch (err) {
    return err;
  }
};
