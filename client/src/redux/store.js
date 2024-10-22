import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import profileReducer from './profileSlice';
import recordsReducer from './recordsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    records: recordsReducer,
  },
});

export default store;