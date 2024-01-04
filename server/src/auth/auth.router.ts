import { Router } from 'express';
import { registerUser, loginUser, logoutUser } from './auth.controller';

const authRouter = Router();

authRouter.route('/register').post(registerUser);
authRouter.route('/login').post(loginUser);
authRouter.route('/logout').post(logoutUser);

export default authRouter;
