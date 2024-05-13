import React from "react";

import c from "../FinalAssembl/FinalAssembly.module.css";
import TableHeader from "../UI/TableHeader";
import { generateWeeks } from "../functions/utilis";

const Logistic = () => {
  const weeks = generateWeeks();
  return (
    <>
      <div className={c.header}>
        <h2>Quality </h2>
      </div>
      <br />
      <div className={c.table}>
        <table>
          <TableHeader />
          <tbody>
            <React.Fragment>
              <tr>
                <td>MPC DH Required</td>
                {weeks.map((w, i) => (
                  <td key={i}>-</td>
                ))}
              </tr>
            </React.Fragment>

            <React.Fragment>
              <tr className={c.total}>
                <td>MPC DH</td>
                {weeks.map((w, i) => (
                  <td key={i}>-</td>
                ))}
              </tr>
              <tr>
                <td>OPS</td>
              </tr>
              <tr>
                <td>KSK Printing Orders</td>
              </tr>
              <tr>
                <td>Sequencing</td>
              </tr>
              <tr>
                <td>Reception Warehouse</td>
              </tr>
              <tr>
                <td> RM DR</td>
              </tr>
              <tr>
                <td> FG Warehouse</td>
              </tr>
              <tr>
                <td> FG DR</td>
              </tr>
            </React.Fragment>

            <React.Fragment>
              <tr className={c.total}>
                <td>Quality Special list out of the plant</td>
                {weeks.map((w, i) => (
                  <td key={i}>-</td>
                ))}
              </tr>
              <tr>
                <td>Pregnant women of the plant</td>
              </tr>
              <tr>
                <td>Maternity</td>
              </tr>
              <tr>
                <td>Breastfeeding leave</td>
              </tr>
              <tr>
                <td>LTI: Long term weaknesses, LWD,</td>
              </tr>
              <tr>
                <td>Physical incapacity & NMA</td>
              </tr>
            </React.Fragment>

            <React.Fragment>
              <tr className={c.total}>
                <td>Quality Actual DH</td>
                {weeks.map((w, i) => (
                  <td key={i}>-</td>
                ))}
              </tr>
              <tr>
                <td>Attrition</td>
              </tr>
              <tr>
                <td>Transfer</td>
              </tr>
              <tr>
                <td>Hiring</td>
              </tr>
            </React.Fragment>

            <tr>
              <td>Gap</td>
              {weeks.map((w, i) => (
                <td key={i}>-</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Logistic;
