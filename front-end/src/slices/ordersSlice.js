import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrders(state, action) {
      const orders = action.payload;
      state.orders = orders; // Assign orders payload to state.orders
    },
  },
});

export const { addOrders } = orderSlice.actions;
export default orderSlice.reducer;
