import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AdminWithOutId, AuthState } from './type';
import * as api from './api';

const initialState: AuthState = {
  admin: undefined,
  error: undefined,
};

export const authorization = createAsyncThunk(
  'auth/authorization',
  (value: AdminWithOutId) => api.authLogFetch(value)
);

export const authCheckAdmin = createAsyncThunk('auth/check', () =>
  api.authCheckUserFetch()
);

export const logOut = createAsyncThunk('auth/logout', () => api.logOutFetch());

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(authorization.fulfilled, (state, action) => {
        state.admin = action.payload;
        state.error = undefined;
      })
      .addCase(authorization.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(authCheckAdmin.fulfilled, (state, action) => {
        state.admin = action.payload;
        state.error = undefined;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.admin = undefined;
        state.error = undefined;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});
export const { clearError } = AuthSlice.actions;
export default AuthSlice.reducer;
