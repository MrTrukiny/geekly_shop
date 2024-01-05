import { CreateOrderItemCommand } from './order.types';

const addDecimals = (num: number) => {
  return Number((Math.round(num * 100) / 100).toFixed(2));
};

export const calculatePrices = (orderItems: CreateOrderItemCommand[]) => {
  // Calculate the items price in whole number (pennies) to avoid issues with floating point number calculations
  const itemsPrice = orderItems.reduce((acc, item) => acc + (item.price * 100 * item.quantity) / 100, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  return {
    itemsPrice: addDecimals(itemsPrice),
    shippingPrice: addDecimals(shippingPrice),
    taxPrice: addDecimals(taxPrice),
    totalPrice: addDecimals(totalPrice),
  };
};
