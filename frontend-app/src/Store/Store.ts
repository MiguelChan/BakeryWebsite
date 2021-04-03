import {
    configureStore,
} from '@reduxjs/toolkit';
import {
    suppliersReducer,
} from './Slices/SuppliersSlice';

const store = configureStore({
    reducer: {
        suppliersReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {
    store,
};