import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customer: null,
  isAuthenticated: false,
  token: localStorage.getItem("token") || null,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomer(state, action) {
      state.customer = action.payload;
      state.isAuthenticated = true;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    clearCustomer(state) {
      state.customer = null;
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setCustomer, clearCustomer, setToken } = customerSlice.actions;

export default customerSlice.reducer;
