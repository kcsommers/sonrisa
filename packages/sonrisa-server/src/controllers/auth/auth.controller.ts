import { IAdmin, ILoginCredentials } from '@sonrisa/core';
import bcrypt from 'bcryptjs';
import { Request, Response, Router } from 'express';
import HttpStatusCodes from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { omit } from 'lodash';
import { AdminModel } from '../../database';
import { verifyToken } from './middleware';

const router = Router();

router.post(
  '/login',
  async (_req: Request<any, any, ILoginCredentials>, _res: Response) => {
    try {
      const _credentials: ILoginCredentials = _req.body;
      if (!(_credentials.email && _credentials.password)) {
        return _res
          .status(HttpStatusCodes.BAD_REQUEST)
          .send('All Inputs Required');
      }

      const _user = await AdminModel.findOne({ email: _credentials.email });
      if (!_user) {
        return _res
          .status(HttpStatusCodes.BAD_REQUEST)
          .send('Could not find user with that email');
      }

      const _passwordValid: boolean = await bcrypt.compare(
        _credentials.password,
        _user.password
      );
      if (!_passwordValid) {
        return _res
          .status(HttpStatusCodes.BAD_REQUEST)
          .send('Invalid Password');
      }

      const _token = jwt.sign(
        {
          userId: _user._id,
          email: _user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '2h',
        }
      );
      console.log(`Successfully logged in user: ${_user.email}`);
      _user.token = _token;
      _res.status(HttpStatusCodes.OK).json(omit(_user.toObject(), 'password'));
    } catch (_error: any) {
      console.error('Login Error::::', _error);
      _res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
);

router.post(
  '/verify',
  verifyToken,
  (_req: Request<any, any, IAdmin>, _res: Response<boolean>) => {
    _res.status(HttpStatusCodes.OK).json(true);
  }
);

export const authController = router;
