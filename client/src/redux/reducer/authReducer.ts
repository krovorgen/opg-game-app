import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiAuth, UserType } from '../../api/auth';
import { setInitializedStatus } from './appReducer';
import { catchHandler } from '../../helpers/catchHandler';
import { toast } from 'react-toastify';

export type UserInitialState = {
  isLoggedIn: boolean;
  user: UserType | null;
  token: string;
};

const initialState: UserInitialState = {
  isLoggedIn: false,
  user: null,
  token: localStorage.getItem('token') || '',
};

export const initializedTC = createAsyncThunk('auth/checkLogged', async (_, { dispatch }) => {
  try {
    const res = await apiAuth.checkLogin();
    dispatch(changeLoggedStatus(true));
    dispatch(setUser(res.data));
  } catch ({ response }) {
    catchHandler(response);
  } finally {
    dispatch(setInitializedStatus(true));
  }
});

export const loginUserTC = createAsyncThunk(
  'auth/login',
  async (userData: { email: string; password: string }, { dispatch }) => {
    try {
      const res = await apiAuth.login(userData.email, userData.password);
      dispatch(changeLoggedStatus(true));
      dispatch(setToken(res.data.token));
      toast.success('Вход выполнен успешно');
    } catch ({ response }) {
      catchHandler(response);
    }
  },
);

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeLoggedStatus: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setUser: (state, action: PayloadAction<UserType | null>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = '';
      state.isLoggedIn = false;
      state.user = null;
      localStorage.clear();
    },
  },
});

export const { changeLoggedStatus, setUser, setToken, logout } = slice.actions;

export const authReducer = slice.reducer;
