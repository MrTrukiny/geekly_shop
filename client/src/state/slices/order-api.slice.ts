import { ORDERS_URL, PAYPAL_URL } from '@/constants';
import { apiSlice } from './api.slice';
import { CreateOrderUnpaid, Order, OrderDelivered, OrderPaid, OrderUnpaid, PaymentDetails } from '@/types/order.types';

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<OrderUnpaid, CreateOrderUnpaid>({
      query: (order) => ({ url: ORDERS_URL, method: 'POST', body: order, credentials: 'include', cookies: true }),
    }),
    getOrderDetails: builder.query<Order, number>({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    payOrder: builder.mutation<OrderPaid, { orderId: string; paymentDetails: PaymentDetails }>({
      query: ({ orderId, paymentDetails }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
        body: paymentDetails,
      }),
    }),
    getPaypalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getMyOrders: builder.query<Order[], void>({
      query: () => ({
        url: `${ORDERS_URL}/mine`,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query<Order[], void>({
      query: () => ({
        url: ORDERS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    deliverOrder: builder.mutation<OrderDelivered, number>({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: 'PUT',
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation,
} = orderApiSlice;
