import { Router } from 'express';
import { getUsers, getUserById, updateUser, deleteUser, getUserProfile, updateUserProfile } from './user.controller';

const userRouter = Router();

/* Admin routes */
userRouter.route('/').get(getUsers);
userRouter.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

/* User routes */
userRouter.route('/profile').get(getUserProfile).put(updateUserProfile);

export default userRouter;
