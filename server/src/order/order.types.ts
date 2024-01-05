import { Request } from 'express';

export enum OrderStatus {
  CART = 'cart',
  COMPLETED = 'completed',
}

export interface CreateOrderDto {
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
  status: OrderStatus;
  orderItems: CreateOrderItemDto[];
  shippingAddress: CreateShippingAddressDto;
  user: number;
}

export interface CreateOrderItemDto {
  id: number;
  quantity: number;
  price: number;
}

export interface CreateOrderItemCommand {
  id: number;
  quantity: number;
  price: number;
}

export interface CreateShippingAddressDto {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface ReqCreateOrderBody extends Request {
  body: CreateOrderDto;
}

export interface UpdateOrderPaymentDto {
  paymentId: string;
  status: string;
  updateTime: string;
  email: string;
}

export interface ReqUpdateOrderPaymentBody extends Request {
  body: UpdateOrderPaymentDto;
}
