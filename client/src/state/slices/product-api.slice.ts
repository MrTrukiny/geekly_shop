import { PRODUCTS_URL } from '@/constants';
import { apiSlice } from './api.slice';
import { PaginatedProducts, Product } from '@/types/product.types';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<PaginatedProducts, { page: number; keyword?: string }>({
      query: ({ page, keyword }) => ({ url: PRODUCTS_URL, params: { page, keyword } }),
      keepUnusedDataFor: 5,
      providesTags: ['Product'],
    }),
    getProductDetails: builder.query<Product, string>({
      query: (productId) => ({ url: `${PRODUCTS_URL}/${productId}` }),
      keepUnusedDataFor: 5,
    }),
    getTopProducts: builder.query<Product[], void>({
      query: () => `${PRODUCTS_URL}/top`,
      keepUnusedDataFor: 5,
    }),
    createReview: builder.mutation({
      query: ({ productId, reviewData }) => ({
        url: `${PRODUCTS_URL}/${productId}/reviews`,
        method: 'POST',
        body: reviewData,
        credentials: 'include',
      }),
      invalidatesTags: ['Product'],
    }),

    /* Admin */
    createProduct: builder.mutation({
      query: () => ({
        url: `${PRODUCTS_URL}`,
        method: 'POST',
        credentials: 'include',
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation({
      query: ({ productId, productData }) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'PUT',
        body: productData,
        credentials: 'include',
      }),
      invalidatesTags: ['Product'],
    }),
    uploadProductImage: builder.mutation({
      query: (image) => ({
        url: '/api/v1/uploads',
        method: 'POST',
        body: image,
        credentials: 'include',
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery,
} = productsApiSlice;
