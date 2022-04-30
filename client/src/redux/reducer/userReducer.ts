import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiAuth, UserType } from '../../api/auth';
import { setInitializedStatus } from './appReducer';
import { catchHandler } from '../../helpers/catchHandler';

export type UserInitialState = {
  isLoggedIn: boolean;
  user: UserType | null;
};

const initialState: UserInitialState = {
  isLoggedIn: false,
  user: null,
};

export const initializedTC = createAsyncThunk('user/checkLogged', async (_, { dispatch }) => {
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

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeLoggedStatus: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
  },
});

export const { changeLoggedStatus, setUser } = slice.actions;

export const userReducer = slice.reducer;
