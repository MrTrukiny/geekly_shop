import { Router } from 'express';
import {
  createOrder,
  getOrdersByUser,
  getOrderById,
  updateOrderPayment,
  updateOrderDelivery,
  getOrders,
} from './order.controller';
import { isAdmin, isAuthenticated } from '@/middlewares/auth.middleware';

const orderRouter = Router();

/* User routes */
orderRouter.route('/').post(isAuthenticated, createOrder);
orderRouter.route('/my-orders').get(isAuthenticated, getOrdersByUser);

/* Shared routes */
orderRouter.route('/:orderId').get(isAuthenticated, getOrderById);

/* Admin routes */
orderRouter.route('/').get(isAuthenticated, isAdmin, getOrders);
orderRouter.route('/:orderId/pay').put(isAuthenticated, updateOrderPayment);
orderRouter.route('/:orderId/deliver').put(isAuthenticated, isAdmin, updateOrderDelivery);

export default orderRouter;
