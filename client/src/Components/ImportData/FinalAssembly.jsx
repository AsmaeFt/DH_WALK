import React, { useState } from "react";
import c from "./import.module.css";
import Project from "./ProjectData";
import AFM from "./AFM";

const FinalAssembly = () => {
  const [view, setview] = useState("Project");

  const renderView = () => {
    switch (view) {
      case "Project":
        return <Project />;
      case "AFM":
        return <AFM />;
    }
  };
  return (
    <>
     <div className={c.Form_Header}>
        {/* <h3>Week: w01 </h3>
        <h3>year : {new Date().getFullYear()}</h3> */}
      </div>
      <div className={c.Header}>
        <React.Fragment>
          <label onClick={() => setview("Project")}>Project</label>
          <label onClick={() => setview("AFM")}>After Sales</label>
        </React.Fragment>
      </div>

     

      {renderView()}
    </>
  );
};

export default FinalAssembly;
