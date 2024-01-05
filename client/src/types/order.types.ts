import { Cart, CartItem } from './cart.types';

export type Order = Omit<Cart, 'cartItems'> & {
  id: number;
  orderItems: CartItem[];
  isPaid: boolean;
  paidAt: Date | null;
  paymentResult: PaymentResult | null;
  isDelivered: boolean;
  deliveredAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  user: string;
};

export type CreateOrderUnpaid = Omit<Cart, 'cartItems'> & {
  orderItems: CartItem[];
};

export type OrderUnpaid = Omit<Cart, 'cartItems'> & {
  id: number;
  orderItems: CartItem[];
  isPaid: boolean;
  user: string;
};

export type OrderPaid = OrderUnpaid & {
  isPaid: boolean;
  paidAt: Date;
  paymentResult: PaymentResult;
};

export type OrderDelivered = OrderPaid & {
  isDelivered: boolean;
  deliveredAt: Date;
};

export type PaymentResult = {
  id: string;
  status: string;
  updateTime: string;
  email: string;
};

export type PaymentDetails = {
  paymentId: string;
  status: string;
  updateTime: string;
  email: string;
};
