import { configureStore } from '@reduxjs/toolkit';
import policyReducer from './policySlice';

const store = configureStore({
  reducer: {
    policy: policyReducer,
  }
});

export default store;
