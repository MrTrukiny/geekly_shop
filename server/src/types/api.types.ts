import { Request } from 'express';

export interface User {
  id: number;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface RequestWithUser extends Request {
  user: User;
}
