import { User } from './user.types';

export type RegisterUser = {
  email: string;
  password: string;
};

export type LoginUser = RegisterUser;
export type UserCredentials = User;
