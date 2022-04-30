import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AppInitialState = {
  isInitializedApp: boolean;
};

const initialState: AppInitialState = {
  isInitializedApp: false,
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setInitializedStatus: (state, action: PayloadAction<boolean>) => {
      state.isInitializedApp = action.payload;
    },
  },
});

export const { setInitializedStatus } = slice.actions;

export const appReducer = slice.reducer;
