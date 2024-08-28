import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/products/productSlice';
import profileReducer from '../features/auth/profileSlice';
import categoriesReducer from '../features/products/CategoriesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    profile: profileReducer,
    categories: categoriesReducer,
  },
});
