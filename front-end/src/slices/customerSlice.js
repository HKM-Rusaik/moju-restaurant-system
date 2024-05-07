import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customer: null,
  isAuthenticated: false,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomer(state, action) {
      state.customer = action.payload;
      state.isAuthenticated = true;
    },
    clearCustomer(state) {
      state.customer = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCustomer, clearCustomer } = customerSlice.actions;

export default customerSlice.reducer;
