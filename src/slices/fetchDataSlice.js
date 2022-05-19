import { createSlice } from '@reduxjs/toolkit';
import { fetchApiData } from '../thunks/fetchApiData';

const initialState = {
    items: []
};

export const fetchDataSlice = createSlice({

    name: 'fetchData',

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder.addCase(fetchApiData.fulfilled, (state, action) => {
            state.items.push(...action.payload.results);
        })

    }

});


export default fetchDataSlice.reducer;