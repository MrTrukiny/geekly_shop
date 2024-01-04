import { Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const generateToken = (res: Response, userId: number) => {
  console.info('Generating JWT...');
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });

  // Set JWT as an HTTP-Only cookie
  console.info('Setting JWT as a cookie');
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // TODO: Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export const decodeToken = (token: string): { userId: number } => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };
};

export const encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
};
