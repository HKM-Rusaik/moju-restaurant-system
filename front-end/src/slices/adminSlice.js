import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null,
  isAuthenticated: false,
  token: localStorage.getItem("adminToken") || null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin(state, action) {
      state.admin = action.payload;
      state.isAuthenticated = true;
    },
    setAdminToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("adminToken", action.payload);
    },
    clearAdmin(state) {
      state.admin = null;
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("adminToken");
    },
  },
});

export const { setAdmin, clearAdmin, setAdminToken } = adminSlice.actions;

export default adminSlice.reducer;
