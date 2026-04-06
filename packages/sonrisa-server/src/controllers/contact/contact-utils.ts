import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';
import env from '../../environment';

const oAuth2Client = new google.auth.OAuth2(
  env.GMAIL_CLIENT_ID,
  env.GMAIL_CLIENT_SECRET,
  env.GMAIL_OAUTH_REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: env.GMAIL_OAUTH_REFRESH_TOKEN,
});

export const sendEmail = async (
  to: string,
  subject: string,
  message: string,
  html: string,
  replyTo?: string
) => {
  try {
    const _accessToken = await oAuth2Client.getAccessToken();

    const _transport = (nodemailer as any).createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: env.SONRISA_EMAIL,
        clientId: env.GMAIL_CLIENT_ID,
        clientSecret: env.GMAIL_CLIENT_SECRET,
        refreshToken: env.GMAIL_OAUTH_REFRESH_TOKEN,
        accessToken: _accessToken,
      },
    });

    const _mailOptions: MailOptions = {
      from: `Sonrisa Donuts <${
        env.SONRISA_EMAIL
      }>`,
      to,
      subject,
      html,
      text: message,
      replyTo: replyTo || '',
    };

    const _result = await _transport.sendMail(_mailOptions);

    return _result;
  } catch (err) {
    return err;
  }
};
