import { In } from 'typeorm';
import { asyncHandler } from '@/middlewares/async-handler.middleware';

/* Helpers & Types */
import { calculatePrices } from './order.helpers';
import { RequestWithUser } from '@/types/api.types';
import { CreateOrderItemCommand, ReqCreateOrderBody, ReqUpdateOrderPaymentBody } from './order.types';

/* Models */
import { productModel, orderModel, paymentResultModel, shippingAddressModel, orderItemsModel } from '@/db/models';

/* Services */
import { verifyNewTransaction, verifyPayPalPayment } from '@/lib/paypal.service';

const createOrder = asyncHandler(async (req: ReqCreateOrderBody, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;
  const { user } = req as RequestWithUser;

  if (orderItems?.length === 0) {
    res.status(400);
    throw new Error('The Order Items is empty!');
  }

  // NOTE: here we must assume that the prices from our client are incorrect.
  // We must only trust the price of the item as it exists in
  // our DB. This prevents a user paying whatever they want by hacking our client

  // get the ordered items from our database
  const dbItems = await productModel.findBy({ id: In(orderItems.map((item) => item.id)) });

  // map over the order items and use the price from our items from database
  const dbOrderItem: CreateOrderItemCommand[] = orderItems.map((clientItem) => {
    const matchingItem = dbItems.find((dbItem) => dbItem.id === clientItem.id);

    if (!matchingItem) {
      res.status(404);
      throw new Error(`Product not found: ${clientItem.id}`);
    }

    return {
      id: matchingItem.id,
      quantity: clientItem.quantity,
      price: matchingItem.price,
    };
  });

  const { itemsPrice, taxPrice, shippingPrice, totalPrice } = calculatePrices(dbOrderItem);

  if (!user) {
    res.status(404);
    throw new Error('There was a problem finding the user');
  }

  const newShippingAddress = shippingAddressModel.create({
    address: shippingAddress.address,
    city: shippingAddress.city,
    postalCode: shippingAddress.postalCode,
    country: shippingAddress.country,
  });

  const savedShippingAddress = await shippingAddressModel.save(newShippingAddress);

  if (!newShippingAddress) {
    res.status(404);
    throw new Error('There was a problem saving the shipping address');
  }

  const newOrderItem = dbOrderItem.map((item) => {
    return orderItemsModel.create({
      product: { id: item.id },
      quantity: item.quantity,
      price: item.price,
    });
  });

  const savedOrderItem = await orderItemsModel.save(newOrderItem);

  const order = await orderModel.save({
    orderItems: savedOrderItem,
    shippingAddress: savedShippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid: false,
    user,
  });

  res.status(201).json(order);
});

const getOrdersByUser = asyncHandler(async (req, res) => {
  const { id: userId } = (req as RequestWithUser).user;

  const orders = await orderModel.find({
    where: { user: { id: userId } },
    relations: { orderItems: true, shippingAddress: true, paymentResult: true },
  });

  res.status(200).json(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { user } = req as RequestWithUser;

  const order = await orderModel.findOne({
    where: { id: Number(orderId) },
    relations: { user: true, orderItems: true, shippingAddress: true, paymentResult: true },
  });

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  if (order.user.id !== user.id && !user.isAdmin) {
    res.status(401);
    throw new Error('Not authorized to view this order');
  }

  res.status(200).json(order);
});

const updateOrderPayment = asyncHandler(async (req: ReqUpdateOrderPaymentBody, res) => {
  const { orderId } = req.params;
  const { paymentId, status, updateTime, email } = req.body;
  const { verified, value } = await verifyPayPalPayment(paymentId);

  if (!verified) {
    throw new Error('Payment not verified');
  }

  const isNewTransaction = await verifyNewTransaction(orderModel, paymentId);

  if (!isNewTransaction) {
    throw new Error('Transaction has been used before');
  }

  const order = await orderModel.findOneBy({ id: Number(orderId) });

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  const paidCorrectAmount = order.totalPrice.toString() === value;

  if (!paidCorrectAmount) {
    throw new Error('Incorrect amount paid');
  }

  const paymentResult = await paymentResultModel.create({
    paymentId,
    status,
    updateTime,
    email,
    order,
  });
  const savedPaymentResult = await paymentResultModel.save(paymentResult);

  if (!savedPaymentResult) {
    throw new Error('There was a problem saving the payment result');
  }

  const updatedOrder = await orderModel.save({
    ...order,
    isPaid: true,
    paidAt: new Date(),
    paymentResult: savedPaymentResult,
  });

  res.status(201).json(updatedOrder);
});

/* Admin */
const updateOrderDelivery = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await orderModel.findOneBy({ id: Number(orderId) });

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  const updatedOrder = await orderModel.save({
    ...order,
    isDelivered: true,
    deliveredAt: new Date(),
  });

  res.status(201).json(updatedOrder);
});

const getOrders = asyncHandler(async (req, res) => {
  const orders = await orderModel.find({ relations: { orderItems: true, shippingAddress: true, paymentResult: true } });

  res.status(200).json(orders);
});

export { createOrder, getOrdersByUser, getOrderById, updateOrderPayment, updateOrderDelivery, getOrders };
