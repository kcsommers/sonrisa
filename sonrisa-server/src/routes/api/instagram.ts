import { IInstagramResponse, IInstagramMedia } from '../../core/public';
import axios from 'axios';
import { Router, Request, Response } from 'express';
import HttpStatusCodes from 'http-status-codes';
import * as fs from 'fs';
import * as path from 'path';

interface IRefreshTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

const router = Router();

const apiBaseUrl = 'https://graph.instagram.com';

router.get('/', (req: Request, res: Response<IInstagramResponse>): void => {
  const instagramToken = require('../../../instagram_token.json');
  const _getMedia = (_token: string) => {
    axios
      .get(
        `${apiBaseUrl}/me/media?fields=id,username,media_url,media_type,caption,permalink&access_token=${_token}&limit=8`
      )
      .then((response) => {
        response.data.data = response.data.data.filter(
          (media: IInstagramMedia) => media.media_type !== 'VIDEO'
        );
        res.json(response.data as IInstagramResponse);
      })
      .catch((err) => {
        console.log('Get Media Error:::: ', err);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(err);
      });
  };
  if (Date.now() - instagramToken.expires > 3600 * 1000 * 24) {
    axios
      .get<IRefreshTokenResponse>(
        `${apiBaseUrl}/refresh_access_token?grant_type=ig_refresh_token&access_token=${instagramToken.token}`
      )
      .then((response) => {
        const _token = {
          token: response.data.access_token,
          expires: Date.now() + response.data.expires_in * 1000,
        };
        fs.writeFileSync(
          path.join(__dirname, '../../../instagram_token.json'),
          JSON.stringify(_token)
        );
        _getMedia(_token.token);
      })
      .catch((err) => {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(err);
      });
  } else {
    _getMedia(instagramToken.token);
  }
});

export default router;
