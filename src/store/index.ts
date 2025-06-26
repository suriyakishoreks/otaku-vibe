import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import localforage from 'localforage';

import { jikanApi } from '../services/jikan';

import appContextSlice from './slices/appContextSlice';
import persistedAppContextSlice from './slices/persistedAppContext';

import { setupListeners } from '@reduxjs/toolkit/query';

const rootReducer = combineReducers({
    [jikanApi.reducerPath]: jikanApi.reducer,
    appContext: appContextSlice,
    persistedAppContext: persistedAppContextSlice
});

const persistConfig = {
    key: 'root',
    storage: localforage,
    whitelist: ['persistedAppContext']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(jikanApi.middleware),
});

export const persistor = persistStore(store);

localforage.config({
    name: 'otakuVibeDB',
    storeName: 'reduxPersistStore',
    description: 'Persisted Redux state for OtakuVibe',
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

// TODO: redux-persist