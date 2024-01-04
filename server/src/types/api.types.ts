import { Request } from 'express';

interface User {
  id: number;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface RequestWithUser extends Request {
  user: User;
}
