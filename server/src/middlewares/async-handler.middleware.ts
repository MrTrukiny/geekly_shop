import { Request, Response, NextFunction } from 'express';

type AsyncHandlerMiddleware = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>,
) => (req: Request, res: Response, next: NextFunction) => void;

export const asyncHandler: AsyncHandlerMiddleware = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
