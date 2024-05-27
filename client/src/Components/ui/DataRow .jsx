import React from "react";
import c from "../FinalAssembl/FinalAssembly.module.css";

const DataRow = ({ Title, data, handelChange, dataPath }) => {

    const getValueFromPath =(obj,path)=>{
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    }
  return (
    <>
      <tr style={{ backgroundColor: "#ffe99a" }} className={c.Show_hidens}>
        <td>{Title}</td>
        {data.map((item, i) => {
          const value = getValueFromPath(item, dataPath);
          const color = value > 0 ? "red" : "";
          return (
            <td key={i} style={{ backgroundColor: color }}>
              <input
                placeholder={value || "0"}
                onChange={(e) => handelChange(item, dataPath, e.target.value)}
              />
            </td>
          );
        })}
      </tr>
    </>
  );
};

export default DataRow;
