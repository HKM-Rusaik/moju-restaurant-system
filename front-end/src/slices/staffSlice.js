import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  staff: null,
  isAuthenticated: false,
  token: localStorage.getItem("staffToken"),
};

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    setStaff(state, action) {
      state.staff = action.payload;
      state.isAuthenticated = true;
    },
    setStaffToken(state, action) {
      state.token = action.payload;
      localStorage.getItem("staffToken", action.payload);
    },
    clearStaff(state, action) {
      state.staff = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("staffToken");
    },
  },
});

export const { setStaff, setStaffToken, clearStaff } = staffSlice.actions;
export default staffSlice.reducer;
