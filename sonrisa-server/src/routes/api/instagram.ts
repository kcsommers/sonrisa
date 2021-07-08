import { IInstagramResponse } from '../../core/public';
import axios from 'axios';
import { Router, Request, Response } from 'express';
import HttpStatusCodes from 'http-status-codes';
import { environments } from '../../environments';

const router = Router();

const apiBaseUrl = 'https://graph.instagram.com';

router.get('/', (req: Request, res: Response<IInstagramResponse>): void => {
  axios
    .get(
      `${apiBaseUrl}/me/media?fields=id,username,media_url,caption,permalink&access_token=${
        environments[process.env.NODE_ENV].INSTAGRAM_TOKEN
      }`
    )
    .then((response) => {
      res.json(response.data as IInstagramResponse);
    })
    .catch((err) => {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(err);
    });
});

export default router;
