import { configureStore } from '@reduxjs/toolkit';
import fetchDataSlice from '../slices/fetchDataSlice';

export const store = configureStore({
    reducer: {
        fetchData: fetchDataSlice
    }
});