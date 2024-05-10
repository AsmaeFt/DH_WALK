import { createSlice } from "@reduxjs/toolkit";

export const ProjectDataSlice = createSlice({
  name: "data",
  initialState: {
    data: {},
  },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
});
export const projectActions = ProjectDataSlice.actions;
export default ProjectDataSlice.reducer;
