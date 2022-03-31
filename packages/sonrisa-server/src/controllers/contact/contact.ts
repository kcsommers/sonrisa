import { IContactRequest, IContactResponse } from '@sonrisa/core';
import { Request, Response, Router } from 'express';
import { sendEmail } from './contact-utils';
import { environments } from '../../environments';

const router: Router = Router();

router.post('/', (req: Request, res: Response<IContactResponse>) => {
  const _request = req.body as IContactRequest;

  sendEmail(
    environments[process.env.NODE_ENV].SONRISA_EMAIL,
    `You got a message from ${_request.customer.givenName} ${_request.customer.familyName}`,
    _request.message,
    `<h1>${_request.message}</h1>`,
    _request.customer.emailAddress
  )
    .then((emailRes) => {
      console.log('EMAIL RESPONSE:::: ', emailRes);
      res.json({ errors: null, success: true });
    })
    .catch((err) => {
      console.error('EMAIL ERROR:::: ', err);
      res.json({ errors: [err], success: false });
    });
});

export const contactRouter = router;
