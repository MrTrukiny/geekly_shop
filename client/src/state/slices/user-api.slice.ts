import { USERS_URL } from '@/constants';
import { apiSlice } from './api.slice';
import { UpdateUserProfile, User, UserProfile } from '@/types/user.types';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<UserProfile, void>({
      query: () => ({
        url: `${USERS_URL}/profile`,
        credentials: 'include',
      }),
      keepUnusedDataFor: 5,
    }),
    updateProfile: builder.mutation<UserProfile, UpdateUserProfile>({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
        credentials: 'include',
      }),
    }),

    /* Admin */
    getUsers: builder.query<User[], void>({
      query: () => ({
        url: USERS_URL,
        credentials: 'include',
      }),
      providesTags: ['User'],
      keepUnusedDataFor: 5,
    }),
    getUserDetails: builder.query<User, string>({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        credentials: 'include',
      }),
      keepUnusedDataFor: 5,
    }),
    updateUser: builder.mutation<User, { userId: string; userData: User }>({
      query: ({ userId, userData }) => ({
        url: `${USERS_URL}/${userId}`,
        method: 'PUT',
        body: userData,
        credentials: 'include',
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation<{ message: string }, string>({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetUsersQuery,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApiSlice;
