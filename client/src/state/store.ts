import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/api.slice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true, // TODO: Remove in production
});
