import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./slices/product-slice";
import { userSlice } from "./slices/user-slice";

export const store = configureStore({
  reducer: {
    productSlice: productsSlice.reducer,
    userSlice: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
