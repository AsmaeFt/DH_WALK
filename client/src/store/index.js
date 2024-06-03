import { configureStore } from "@reduxjs/toolkit";
import loginS from "./LogInSlice";

const store = configureStore({
  reducer: {
    login: loginS.reducer,
  },
});
export default store;