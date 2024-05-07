import { configureStore } from "@reduxjs/toolkit";
import cartItem from "slices/cartItem";
import customerReducer from "slices/customerSlice";

export const store = configureStore({
  devTools: true,
  reducer: {
    selectedItems: cartItem,
    customer: customerReducer,
  },
});
