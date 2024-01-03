import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Cart, CartItem, ShippingAddress } from '../cart.types';
import { updateCart } from './cart-slice.helper';

export type CartSliceState = Cart;

const initialState: CartSliceState = {
  cartItems: [],
  shippingAddress: {
    address: '',
    city: '',
    postalCode: '',
    country: '',
  },
  paymentMethod: 'paypal',
  itemsPrice: null,
  shippingPrice: null,
  taxPrice: null,
  totalPrice: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ cartItem: CartItem }>) => {
      const { cartItem } = action.payload;

      const existItem = state.cartItems.find((item) => item.id === cartItem.id);

      if (existItem) {
        state.cartItems = state.cartItems.map((item) => (item.id === existItem.id ? cartItem : item));
      } else {
        state.cartItems = [...state.cartItems, cartItem];
      }

      return updateCart(state);
    },
    removeFromCart: (state, action: PayloadAction<Pick<CartItem, 'id'>>) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
      return updateCart(state);
    },
    saveShippingAddress: (state, action: PayloadAction<ShippingAddress>) => {
      state.shippingAddress = action.payload;
    },
    savePaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
    },
    clearCartItems: (state) => {
      state.cartItems = [];
    },

    // NOTE: here we need to reset state for when a user logs out so the next
    // user doesn't inherit the previous users cart and shipping
    resetCart: () => initialState,
  },
});

export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems, resetCart } =
  cartSlice.actions;

export default cartSlice.reducer;
