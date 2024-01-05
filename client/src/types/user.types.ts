export type User = {
  email: string;
  password: string;
  isAdmin: boolean | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
};

export type UpdateUserProfile = Omit<User, 'isAdmin' | 'createdAt' | 'updatedAt'>;

export type UserProfile = Omit<User, 'createdAt' | 'updatedAt'>;
