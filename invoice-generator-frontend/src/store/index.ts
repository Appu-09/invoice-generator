import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/authSlice";
import productReducer from "@/store/productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
