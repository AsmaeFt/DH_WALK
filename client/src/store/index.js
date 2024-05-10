import { configureStore } from "@reduxjs/toolkit";
import ProjecS from "./ProjectdataSlice";

const store = configureStore({
  reducer: { projectData: ProjecS },
});
export default store;
