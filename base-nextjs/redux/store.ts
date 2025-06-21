import { configureStore } from '@reduxjs/toolkit';
import parcoVeicoliReducer from './parcoVeicoliSlice';

export const store = configureStore({
    reducer: {
        parcoVeicoli: parcoVeicoliReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
