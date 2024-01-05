import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserCredentials } from '@/types/auth.types';
import { User } from '@/types/user.types';

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
    setCredentials: (state, action: PayloadAction<UserCredentials>) => {
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
