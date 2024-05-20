import React from "react";
import c from "./UI.module.css";
const Loading = () => {
  return (
    <>
    <div className={c.container}>
    <div className={c.lds_ripple}>
        <div></div>
        <div></div>
      </div>
    </div>
     
    </>
  );
};

export default Loading;
