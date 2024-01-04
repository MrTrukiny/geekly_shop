import { CartSliceState } from './cart.slice';

export const addDecimals = (num: number) => {
  return Number((Math.round(num * 100) / 100).toFixed(2));
};

export const updateCart = (state: CartSliceState) => {
  // Calculate the items price in whole number (pennies) to avoid issues with floating point number calculations
  const itemsPrice = state.cartItems.reduce((acc, item) => acc + (item.price * 100 * item.quantity) / 100, 0);
  state.itemsPrice = addDecimals(itemsPrice);

  // Calculate the shipping price
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  state.shippingPrice = addDecimals(shippingPrice);

  // Calculate the tax price
  const taxPrice = 0.15 * itemsPrice;
  state.taxPrice = addDecimals(taxPrice);

  // Calculate the total price
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  state.totalPrice = addDecimals(totalPrice);

  return state;
};
