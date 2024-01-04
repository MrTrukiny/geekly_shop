import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '@/types/api.types';

import { asyncHandler } from './async-handler.middleware';
import { decodeToken } from '@/auth/auth.helpers';
import { userModel } from '@/db/models';

const isAuthenticated = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.jwt;

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }

  try {
    const { userId } = decodeToken(token);
    const user = await userModel.findOneBy({ id: userId });

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    (req as RequestWithUser).user = user;

    next();
  } catch (error) {
    console.error(error);
    res.status(401);
    throw new Error('Not authorized, token failed');
  }
});

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const reqUser = req as RequestWithUser;
  if (!reqUser.user?.isAdmin) {
    res.status(401);
    throw new Error('Not authorized as an Admin');
  }

  next();
};

export { isAuthenticated, isAdmin };
