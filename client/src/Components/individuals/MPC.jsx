import React from "react";
import { generateWeeks } from "../functions/utilis";
import TableHeader from "../ui/TableHeader";
const Mpc = () => {
  const weeksandmonths = generateWeeks();
  return (
    <>
      <div>
        <h2>MPC DH</h2>
      </div>
      <div>
        <br></br>
        <br></br>
        <br></br>
      </div>
      <div className="table_container fadeUp">
        <table>
          <TableHeader />
          <tbody>
            <tr style={{ background: "orangered" }}>
              <td>MPC DH Required</td>
              {weeksandmonths.flatMap((w) => (
                <td key={w.week}>-</td>
              ))}
            </tr>
            <tr style={{ background: "black" }}>
              <td>MPC Project DH</td>
              {weeksandmonths.flatMap((w) => (
                <td key={w.week}>-</td>
              ))}
            </tr>
           

           <React.Fragment>
            <tr style={{background:'black'}}>
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
              <td>RM DR</td>
            </tr>
            <tr>
              <td>FG Warehouse</td>
            </tr>
            <tr>
              <td>FG DR</td>
            </tr>
           </React.Fragment>

            <React.Fragment>
              <tr style={{ background: "black" }}>
                <td>Quality SLOP </td>
                {weeksandmonths.flatMap((w) => (
                  <td key={w.week}>-</td>
                ))}
              </tr>
              <tr>
                <td>Pregnant women of the plant</td>
                {weeksandmonths.flatMap((w) => (
                  <td key={w.week}>-</td>
                ))}
              </tr>
              <tr>
                <td>Maternity</td>
                {weeksandmonths.flatMap((w) => (
                  <td key={w.week}>-</td>
                ))}
              </tr>
              <tr>
                <td>Breastfeeding leave</td>
                {weeksandmonths.flatMap((w) => (
                  <td key={w.week}>-</td>
                ))}
              </tr>
              <tr>
                <td>LTI: Long term weaknesses, LWD, t</td>
                {weeksandmonths.flatMap((w) => (
                  <td key={w.week}>-</td>
                ))}
              </tr>
              <tr>
                <td>Physical incapacity & NMA</td>
                {weeksandmonths.flatMap((w) => (
                  <td key={w.week}>-</td>
                ))}
              </tr>
            </React.Fragment>

            <React.Fragment>
              <tr style={{ background: "black" }}>
                <td> Quality Actual DH</td>
                {weeksandmonths.flatMap((w) => (
                  <td key={w.week}>-</td>
                ))}
              </tr>
              <tr>
                <td> Attrition</td>
                {weeksandmonths.flatMap((w) => (
                  <td key={w.week}>-</td>
                ))}
              </tr>
              <tr>
                <td> Transfer</td>
                {weeksandmonths.flatMap((w) => (
                  <td key={w.week}>-</td>
                ))}
              </tr>
              <tr>
                <td> Hiring</td>
                {weeksandmonths.flatMap((w) => (
                  <td key={w.week}>-</td>
                ))}
              </tr>
            </React.Fragment>
            <React.Fragment>
              <tr style={{ background: "orangered" }}>
                <td>Gap</td>
                {weeksandmonths.flatMap((w) => (
                  <td key={w.week}>-</td>
                ))}
              </tr>
            </React.Fragment>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Mpc;
