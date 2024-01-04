import { Request } from 'express';

export interface ReqCreateUserBody extends Request {
  body: {
    email: string;
    password: string;
    isAdmin: boolean;
  };
}
