import React, { useState } from "react";
import c from "./auth.module.css";
import { useDispatch } from "react-redux";
import api from "../../services/api";
import { loginActions } from "../../store/LogInSlice";
import Overlay from "../layout/Overlay";
import axios from "axios";
const Auth = () => {
  const [Login, setLogin] = useState({
    username: "",
    password: "",
  });

  const [err, seterr] = useState(false);
  const dispatch = useDispatch();

  const ClickHandler = async (e) => {
    e.preventDefault();

    if (loginCred.username.trim() === "" || loginCred.password.trim() === "") {
      alert("please make sure all field not empty");
      return;
    }
    try {
      const res = await axios.post(`${api}/Login`);
      const data = res.data;
      dispatch(
        loginActions.logIn({
          role: data.user.role,
          userName: data.user.fullname,
          mtll: data.user.username === undefined ? "" : data.user.username,
          token: data.token,
        })
      );
    } catch (e) {
      setErr(true);
      console.error(e);
    }
  };

  return (
    <>
      <Overlay />
      <div className={c["Login-Form"]}>
        <fieldset>
          <legend>Login</legend>
          <form onSubmit={ClickHandler}>
            <div className={c["user-container"]}>
              <input
                type="text"
                name="matricule"
                placeholder="User Name"
                className={c["username"]}
                value={Login.username}
                onChange={(e) =>
                  setLogin((p) => ({ ...p, username: e.target.value }))
                }
              />
            </div>

            <div className={c["password-container"]}>
              <input
                type="password"
                name="password"
                placeholder="User Password"
                className={c["userpassword"]}
                value={Login.password}
                onChange={(e) =>
                  setLogin((p) => ({ ...p, password: e.target.value }))
                }
              />
            </div>
            <button className={c["Login"]}>Submit</button>
          </form>
        </fieldset>
      </div>
    </>
  );
};

export default Auth;
