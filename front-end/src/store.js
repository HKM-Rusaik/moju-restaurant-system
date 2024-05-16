import { configureStore } from "@reduxjs/toolkit";
import cartItem from "slices/cartItem";
import customerReducer from "slices/customerSlice";
import ordersSlice from "slices/ordersSlice";

export const store = configureStore({
  devTools: true,
  reducer: {
    selectedItems: cartItem,
    customer: customerReducer,
    orders: ordersSlice,
  },
});
