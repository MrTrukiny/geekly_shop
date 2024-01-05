import { Product } from './product.types';

export type Cart = {
  cartItems: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice: number | null;
  shippingPrice: number | null;
  taxPrice: number | null;
  totalPrice: number | null;
};

export type CartItem = Product & {
  productId?: number;
  quantity: number;
};

export type ShippingAddress = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};
