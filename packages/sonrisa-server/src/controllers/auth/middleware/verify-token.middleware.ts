import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import HttpStatusCodes from 'http-status-codes';

export const verifyToken = (
  _req: Request,
  _res: Response,
  _next: NextFunction
) => {
  const _token =
    _req.body.token || _req.query.token || _req.headers['x-access-token'];

  if (!_token) {
    return _res
      .status(HttpStatusCodes.FORBIDDEN)
      .send('A token is required for authentication');
  }
  try {
    jwt.verify(_token, process.env.JWT_SECRET);
  } catch (err) {
    return _res.status(HttpStatusCodes.UNAUTHORIZED).send('Invalid Token');
  }
  return _next();
};
