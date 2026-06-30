import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// thunk for api call
export const fetchRecipes = createAsyncThunk(
    'recipes/fetchRecipes',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://api.spoonacular.com/recipes/random?number=10&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`);
            console.log(response.data.recipes);
            return response.data.recipes; // fulfilled
        } catch (error) {
            return rejectWithValue(error.message); // rejected
        }
    }
);

// slice
const recipeSlice = createSlice({
    name: 'recipes',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRecipes.fulfilled, (state, action) => {
                state.loading = false;
                state.data = [...state.data, ...action.payload];
            })
            .addCase(fetchRecipes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; 
            });
    },
});

export default recipeSlice.reducer;
