import { Router } from 'express';
import { getUsers, getUserById, updateUser, deleteUser, getUserProfile, updateUserProfile } from './user.controller';
import { isAuthenticated, isAdmin } from '@/middlewares/auth.middleware';

const userRouter = Router();

/* User routes */
userRouter.route('/profile').get(isAuthenticated, getUserProfile).put(isAuthenticated, updateUserProfile);

/* Admin routes */
userRouter.route('/').get(isAuthenticated, isAdmin, getUsers);
userRouter
  .route('/:userId')
  .get(isAuthenticated, isAdmin, getUserById)
  .put(isAuthenticated, isAdmin, updateUser)
  .delete(isAuthenticated, isAdmin, deleteUser);

export default userRouter;
