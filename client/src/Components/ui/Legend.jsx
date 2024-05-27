import React from "react";
import c from "./UI.module.css";
const Legend = () => {
  return (
    <>
      <div className={c.legend}>
        <fieldset>
            <legend>Legend</legend>
             
        <div>
            <label>Total DH Required </label> <span style={{backgroundColor:'black'}}></span>
            <label> Total  </label> <span style={{backgroundColor:'#3f3f3f'}}></span>
            <label> Total Family  </label> <span style={{backgroundColor:'#0e3137'}}></span>
            <label> Actual DH  </label> <span style={{backgroundColor:'#b5330371'}}></span>
        </div>
        </fieldset>
      
     
      </div>
    </>
  );
};

export default Legend;
