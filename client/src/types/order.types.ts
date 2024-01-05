import { Cart, CartItem } from './cart.types';
import { User } from './user.types';

export type Order = Omit<Cart, 'cartItems'> & {
  id: number;
  orderItems: OrderItem[];
  isPaid: boolean;
  paidAt: Date | null;
  paymentResult: PaymentResult | null;
  isDelivered: boolean;
  deliveredAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  user: User;
};

type OrderItem = {
  id: number;
  quantity: number;
  price: number;
  product: {
    id: number;
    name: string;
    image: string;
  };
};

export type CreateOrderUnpaid = Omit<Cart, 'cartItems'> & {
  orderItems: CartItem[];
};

export type OrderUnpaid = Omit<Cart, 'cartItems'> & {
  id: number;
  orderItems: OrderItem[];
  isPaid: boolean;
  user: User;
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
