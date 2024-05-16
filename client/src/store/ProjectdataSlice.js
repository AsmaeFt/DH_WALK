import { createSlice } from "@reduxjs/toolkit";

export const ProjectDataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
  },
  reducers: {
    setData(state, action) {
      console.log("modifying...");
      console.log("Previous state:", state.data);
      state.data = action.payload;
      console.log("New state:", state.data);
    },
  },
});
export const projectActions = ProjectDataSlice.actions;
export default ProjectDataSlice.reducer;
