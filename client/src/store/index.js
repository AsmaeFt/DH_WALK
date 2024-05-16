import { configureStore } from "@reduxjs/toolkit";
import ProjecS from "./ProjectdataSlice";
import data_DH_walk from "./DataSlice";

const store = configureStore({
  reducer: {
    projectData: ProjecS,
    data: data_DH_walk,
  },
});
export default store;
