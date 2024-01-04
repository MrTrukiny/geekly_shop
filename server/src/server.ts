import express from 'express';

/* Routers */
import authRouter from './auth/auth.router';
import userRouter from './user/user.router';
import productRouter from './product/product.router';

/* Middlewares */
import { notFound, errorHandler } from '@/middlewares/error-handler.middleware';

const server = express();

server.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

server.use(express.json());
server.use('/api/v1/auth', authRouter);
server.use('/api/v1/users', userRouter);
server.use('/api/v1/products', productRouter);

server.use(notFound);
server.use(errorHandler);

export default server;
