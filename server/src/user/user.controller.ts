import { asyncHandler } from '@/middlewares/async-handler.middleware';
import { RequestWithUser } from '@/types/api.types';
import { ReqCreateUserBody } from './user.types';
import { userModel } from '@/db/models';
import { encryptPassword } from '@/auth/auth.helpers';

const getUserProfile = asyncHandler(async (req, res) => {
  const { id } = (req as RequestWithUser).user;

  const user = await userModel.findOneBy({ id });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  return res.status(200).json({
    id: user.id,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const { id } = (req as RequestWithUser).user;
  const { email, password } = req.body;

  const user = await await userModel
    .createQueryBuilder('user')
    .addSelect('user.password')
    .where('user.id = :id', { id })
    .getOne();

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.email = email || user.email;
  user.password = (await encryptPassword(password)) || user.password;

  const updatedUser = await userModel.save(user);

  return res.status(201).json({
    id: updatedUser.id,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
  });
});

/* Admin */
const createUser = asyncHandler(async (req: ReqCreateUserBody, res) => {
  const { email, password, isAdmin } = req.body;

  const existingUser = await userModel.findOneBy({ email });

  if (existingUser) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await userModel.save({
    email,
    password: await encryptPassword(password),
    isAdmin: isAdmin,
  });

  if (!user) {
    res.status(400);
    throw new Error('Invalid user data');
  }

  res.status(201).json({
    id: user.id,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await userModel.find();

  return res.status(200).json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await userModel.findOne({ where: { id: Number(userId) }, select: { password: false } });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.status(200).json(user);
});

const updateUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { email, password, isAdmin } = req.body;

  const user = await await userModel
    .createQueryBuilder('user')
    .addSelect('user.password')
    .where('user.id = :id', { id: Number(userId) })
    .getOne();

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const updatedUser = await userModel.save({
    ...user,
    email: email || user.email,
    password: (await encryptPassword(password)) || user.password,
    isAdmin: Boolean(isAdmin),
  });

  res.json({
    id: updatedUser.id,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await userModel.findOneBy({ id: Number(userId) });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (user.isAdmin) {
    res.status(400);
    throw new Error('Can not delete admin user');
  }

  await userModel.delete({ id: user.id });

  return res.status(200).json({ message: 'User removed' });
});

export { getUserProfile, updateUserProfile, createUser, getUsers, deleteUser, getUserById, updateUser };
