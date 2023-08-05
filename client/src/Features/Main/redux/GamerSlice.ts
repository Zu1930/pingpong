import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './api';
import { GamerObg, GamerWithOutId, GamersState } from './type';

const initialState: GamersState = {
  gamers: [],
  error: undefined,
};

export const loadGamers = createAsyncThunk('gamers/load', () =>
  api.getGamersFetch()
);

export const addGamer = createAsyncThunk('gamer/add', (value: GamerWithOutId) =>
  api.addGamerFetch(value)
);

export const changeStatus = createAsyncThunk(
  'gamer/change',
  (value: GamerObg) => api.changeStatusFetch(value)
);

const GamerSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadGamers.fulfilled, (state, action) => {
        state.gamers = action.payload;
        state.error = undefined;
      })
      .addCase(loadGamers.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addGamer.fulfilled, (state, action) => {
        state.gamers.push(action.payload);
      })
      .addCase(addGamer.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(changeStatus.fulfilled, (state, action) => {
        state.gamers = state.gamers.map((el) =>
          el.id === action.payload.id ? action.payload : el
        );
        state.error = undefined;
      })
      .addCase(changeStatus.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});
export const { clearError } = GamerSlice.actions;
export default GamerSlice.reducer;
