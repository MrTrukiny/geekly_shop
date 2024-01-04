import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

/* Routers */
import authRouter from './auth/auth.router';
import userRouter from './user/user.router';
import productRouter from './product/product.router';
import orderRouter from './order/order.router';

/* Middlewares */
import { notFound, errorHandler } from '@/middlewares/error-handler.middleware';

const server = express();

server.use(cors({ origin: 'http://localhost:5173', credentials: true }));
server.use(cookieParser());
server.use(express.json());
server.use('/api/v1/auth', authRouter);
server.use('/api/v1/users', userRouter);
server.use('/api/v1/products', productRouter);
server.use('/api/v1/orders', orderRouter);

server.use(notFound);
server.use(errorHandler);

export default server;
