import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchApiData = createAsyncThunk(

    'rickAndMorty/fetchRickAndMorty',

    async () => {

        const response = await axios.get(
            'https://rickandmortyapi.com/api/character'
        );

        return response.data;

    }

);