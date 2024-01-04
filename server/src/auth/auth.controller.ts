import { Request, Response } from 'express';
import { AppDataSource } from '@/db/data-source';
import { asyncHandler } from '@/middlewares/async-handler.middleware';
import { UserEntity } from '@/user/user.entity';
import { generateToken, encryptPassword } from './auth.helpers';

const userModel = AppDataSource.getRepository(UserEntity);

const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await userModel.findOneBy({ email });

  if (existingUser) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await userModel.save({
    email,
    password: await encryptPassword(password),
  });

  if (!user) {
    res.status(400);
    throw new Error('Invalid user data');
  }

  generateToken(res, user.id);

  res.status(201).json({
    id: user.id,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await await userModel
    .createQueryBuilder('user')
    .addSelect('user.password')
    .where('user.email = :email', { email })
    .getOne();

  const matchPassword = await user?.matchPassword(password);

  if (!user || !matchPassword) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  generateToken(res, user.id);

  res.status(200).json({
    id: user.id,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

const logoutUser = (req: Request, res: Response) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  return res.status(200).json({ message: 'Logged out successfully' });
};

export { registerUser, loginUser, logoutUser };
