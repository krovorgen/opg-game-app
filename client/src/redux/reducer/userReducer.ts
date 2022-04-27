import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiAuth, UserType } from '../../api/auth';

export type CounterState = {
  isLoggedIn: boolean;
  user: UserType | null;
};

const initialState: CounterState = {
  isLoggedIn: false,
  user: null,
};

const checkLoginThunk = createAsyncThunk('user/checkLogged', async () => {
  await apiAuth.checkLogin();
});

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeLoggedStatus: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { changeLoggedStatus } = slice.actions;

export const userReducer = slice.reducer;
