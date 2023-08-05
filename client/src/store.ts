import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import AuthSlice from './Features/Admin/redux/AuthSlice';
import GamerSlice from './Features/Main/redux/GamerSlice';

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    gamers: GamerSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: <T>(fn: (state: RootState) => T) => T =
  useSelector;
export type RootState = ReturnType<typeof store.getState>;

export default store;
