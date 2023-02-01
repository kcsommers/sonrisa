import { IInstagramMedia, IInstagramResponse } from '@sonrisa/core';
import axios from 'axios';
import { Request, Response, Router } from 'express';
import HttpStatusCodes from 'http-status-codes';

interface IRefreshTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

const router = Router();

const apiBaseUrl = 'https://graph.instagram.com';

router.get('/', (req: Request, res: Response<IInstagramResponse>): void => {
  const instagramToken = process.env.INSTAGRAM_TOKEN;
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
  axios
    .get<IRefreshTokenResponse>(
      `${apiBaseUrl}/refresh_access_token?grant_type=ig_refresh_token&access_token=${instagramToken}`
    )
    .then((response) => {
      _getMedia(response.data.access_token);
    })
    .catch((err) => {
      console.log('insta res:::: ', err);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(err);
    });
});

export const instagramRouter = router;
