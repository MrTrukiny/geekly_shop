import express from 'express';
import productRouter from './product/product.router';
import { notFound, errorHandler } from '@/middlewares/error-handler.middleware';

const server = express();

server.use(express.json());
server.use('/api/v1/products', productRouter);

server.use(notFound);
server.use(errorHandler);

export default server;
