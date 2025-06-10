import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {};

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: persistedState,
});

export default store;
