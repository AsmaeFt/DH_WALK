import React from "react";
import c from "./UI.module.css";

const Title = ({ title }) => {
  return (
    <>
      <div className={c.title}>
        <div></div>
        <h3>{title}</h3>
      </div>
    </>
  );
};

export default Title;
