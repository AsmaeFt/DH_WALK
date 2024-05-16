import { createSlice } from "@reduxjs/toolkit";

export const dh_walk_data = createSlice({
  name: "data",
  initialState: {
    data: [],
  },
  reducers: {
    setDhwalk(s, a) {
      console.log("prev state :", s.data);
      s.data = a.payload;
      console.log("New state :", a.payload);
    },
  },
});
export const dataActions = dh_walk_data.actions;
export default dh_walk_data.reducer;
