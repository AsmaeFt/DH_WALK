import { createSlice } from "@reduxjs/toolkit";

const loginS = createSlice({
  name: "LogIn",
  initialState: {
    isLoged: {
      login: false,
      token: "",
    },
  },
  reducers: {
    logIn(s, p) {
      s.isLoged.login = true;
      s.isLoged.token = p.payload.token;
    },
    logOut(s, p) {
      s.isLoged = {
        login: false,
        token: "",
      };
    },
  },
});

export const loginActions = loginS.actions;
export default loginS;