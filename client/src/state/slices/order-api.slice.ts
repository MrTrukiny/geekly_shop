import { ORDERS_URL } from '@/constants';
import { apiSlice } from './api.slice';
import { CreateOrderUnpaid, Order, OrderDelivered, OrderPaid, OrderUnpaid, PaymentDetails } from '@/types/order.types';

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<OrderUnpaid, CreateOrderUnpaid>({
      query: (order) => ({ url: ORDERS_URL, method: 'POST', body: order, credentials: 'include', cookies: true }),
    }),
    getOrderDetails: builder.query<Order, string>({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
        credentials: 'include',
      }),
      keepUnusedDataFor: 5,
    }),
    payOrder: builder.mutation<OrderPaid, { orderId: string; paymentDetails: PaymentDetails }>({
      query: ({ orderId, paymentDetails }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
        body: paymentDetails,
        credentials: 'include',
      }),
    }),
    getMyOrders: builder.query<Order[], void>({
      query: () => ({
        url: `${ORDERS_URL}/my-orders`,
        credentials: 'include',
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query<Order[], void>({
      query: () => ({
        url: ORDERS_URL,
        credentials: 'include',
      }),
      keepUnusedDataFor: 5,
    }),
    deliverOrder: builder.mutation<OrderDelivered, string>({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: 'PUT',
        credentials: 'include',
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation,
} = orderApiSlice;
