import { Router } from 'express';
import {
  getUserProfile,
  updateUserProfile,
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from './user.controller';
import { isAuthenticated, isAdmin } from '@/middlewares/auth.middleware';

const userRouter = Router();

/* User routes */
userRouter.route('/profile').get(isAuthenticated, getUserProfile).put(isAuthenticated, updateUserProfile);

/* Admin routes */
userRouter.route('/').get(isAuthenticated, isAdmin, getUsers).post(isAuthenticated, isAdmin, createUser);
userRouter
  .route('/:userId')
  .get(isAuthenticated, isAdmin, getUserById)
  .put(isAuthenticated, isAdmin, updateUser)
  .delete(isAuthenticated, isAdmin, deleteUser);

export default userRouter;
