import { createSlice } from '@reduxjs/toolkit';
import { fetchProductsCategory,createCategory } from './productActions';

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsCategory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductsCategory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload;
            })
            .addCase(fetchProductsCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.categories.push(action.payload);
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(createCategory.pending, (state) => {
                state.status = 'loading';
            });

            
    },
});

export default categoriesSlice.reducer;