import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import { jikanApi } from '../services/jikan';

import appContextSlice from './slices/appContextSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
    reducer: {
        [jikanApi.reducerPath]: jikanApi.reducer,
        appContext: appContextSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(jikanApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();