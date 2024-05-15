import React from "react";
import TableHeader from "../UI/TableHeader";
import { generateWeeks } from "../functions/utilis";
import c from "../FinalAssembl/FinalAssembly.module.css";

const Dh_Walk = () => {
  const gweeks = generateWeeks();
  return (
    <>
      <div>
        <h2>DH WALK {new Date().getFullYear()} </h2>
      </div>
      <div className={c.table}>
        <table>
          <TableHeader />
          <tbody>
            <tr>
              <td>FA DH required </td>
              {gweeks.map((g, i) => (
                <td key={i}>1841</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dh_Walk;
