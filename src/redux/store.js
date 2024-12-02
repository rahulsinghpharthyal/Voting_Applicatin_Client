import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import candidateReducer from './slices/candidateSlice';

// Configure the store
const store = configureStore({
  reducer: {
    auth: authReducer,
    candidate: candidateReducer,
  },
});

export default store;
