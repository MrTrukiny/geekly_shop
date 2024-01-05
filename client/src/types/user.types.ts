export type User = {
  id: number;
  email: string;
  password: string;
  isAdmin: boolean | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
};

export type UpdateUserProfile = Omit<User, 'id' | 'isAdmin' | 'createdAt' | 'updatedAt'>;
export type AdminUpdateUser = Omit<User, 'id' | 'password' | 'createdAt' | 'updatedAt'>;

export type UserProfile = Omit<User, 'createdAt' | 'updatedAt'>;
