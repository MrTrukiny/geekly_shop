import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../user.types';

type AuthSliceState = {
  userInfo: User | null;
};

const initialState: AuthSliceState = {
  userInfo: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<User>) => {
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;