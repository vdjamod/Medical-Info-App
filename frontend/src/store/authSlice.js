import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  isAdmin: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    sigin: (state) => {
      state.status = true;
    },
    signout: (state) => {
      state.status = false;
    },
  },
});

export const { sigin, signout } = authSlice.actions;
export default authSlice.reducer;
