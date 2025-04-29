import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    refresh: false
};

const dataSlice = createSlice({
  name: "medicineData",
  initialState,
  reducers: {
    saveData: (state, action) => {
        state.data = action.payload;
    },

    markRefresh: (state) => {
        state.refresh = true;
    },

    unmarkRefresh: (state) => {
        state.refresh = false;
    }
  },
});

export const {saveData, markRefresh, unmarkRefresh} = dataSlice.actions;
export default dataSlice.reducer;
