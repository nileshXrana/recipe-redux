import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// thunk
export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://dummyjson.com/recipes');
            console.log(response.data.recipes);
            return response.data.recipes; // fulfilled
        } catch (error) {
            return rejectWithValue(error.message); // rejected
        }
    }
);

// export const fetchUsers = createAsyncThunk(
//     'users/fetchUsers',
//     async (_, { rejectWithValue }) => {
//         try {
//             const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=pasta&apiKey=${process.env.SPOONACULAR_API_KEY}`);
//             console.log(response.data.recipes);
//             return response.data.recipes; // fulfilled
//         } catch (error) {
//             return rejectWithValue(error.message); // rejected
//         }
//     }
// );

// slice
const userSlice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload; // Store API results
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Store error message
            });
    },
});

export default userSlice.reducer;
