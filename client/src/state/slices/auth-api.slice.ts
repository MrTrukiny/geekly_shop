import { AUTH_URL } from '@/constants';
import { apiSlice } from './api.slice';
import { User } from '@/types/user.types';
import { LoginUser, RegisterUser } from '@/types/auth.types';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<User, RegisterUser>({
      query: (data) => ({ url: `${AUTH_URL}/register`, method: 'POST', body: data, credentials: 'include' }),
    }),
    login: builder.mutation<User, LoginUser>({
      query: (data) => ({ url: `${AUTH_URL}/login`, method: 'POST', body: data, credentials: 'include' }),
    }),
    logout: builder.mutation({
      query: () => ({ url: `${AUTH_URL}/logout`, method: 'POST' }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } = authApiSlice;
