import React from "react";
import TableHeader from "../ui/TableHeader";
import { generateWeeks } from "../functions/utilis";
const Quality = () => {
  const weeksandmonths = generateWeeks();
  return (
    <>
      <div>
        <h2>Quality DH</h2>
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
              <td>Quality DH Required</td>
              {weeksandmonths.flatMap((w) => (
                <td key={w.week}>-</td>
              ))}
            </tr>
            <tr style={{ background: "black" }}>
              <td>Quality Project DH</td>
              {weeksandmonths.flatMap((w) => (
                <td key={w.week}>-</td>
              ))}
            </tr>
            <React.Fragment>
              <tr>
                <td>K9 PPL Containment</td>
                {weeksandmonths.flatMap((w) => (
                  <td key={w.week}>-</td>
                ))}
              </tr>
              <tr>
                <td>K9 HAB Containment</td>
                {weeksandmonths.flatMap((w) => (
                  <td key={w.week}>-</td>
                ))}
              </tr>
              <tr>
                <td>K9 PDB Containment</td>
                {weeksandmonths.flatMap((w) => (
                  <td key={w.week}>-</td>
                ))}
              </tr>
              <tr>
                <td>K9 Batch Containment</td>
                {weeksandmonths.flatMap((w) => (
                  <td key={w.week}>-</td>
                ))}
              </tr>
              <tr>
                <td> K9 B78 Containment </td>
                {weeksandmonths.flatMap((w) => (
                  <td key={w.week}>-</td>
                ))}
              </tr>
              <tr>
                <td>R8 Containment</td>
                {weeksandmonths.flatMap((w) => (
                  <td key={w.week}>-</td>
                ))}
              </tr>
              <tr>
                <td>X74 Containment</td>
                {weeksandmonths.flatMap((w) => (
                  <td key={w.week}>-</td>
                ))}
              </tr>
            </React.Fragment>

            <React.Fragment>
              <tr style={{ background: "black" }}>
                <td>Quality Other DH</td>
                {weeksandmonths.flatMap((w) => (
                  <td key={w.week}>-</td>
                ))}
              </tr>
              <tr>
                <td>Supper Control</td>
                {weeksandmonths.flatMap((w) => (
                  <td key={w.week}>-</td>
                ))}
              </tr>
              <tr>
                <td>Fire Wall</td>
                {weeksandmonths.flatMap((w) => (
                  <td key={w.week}>-</td>
                ))}
              </tr>
              <tr>
                <td>Validation</td>
                {weeksandmonths.flatMap((w) => (
                  <td key={w.week}>-</td>
                ))}
              </tr>
              <tr>
                <td>FTQ Data Recording</td>
                {weeksandmonths.flatMap((w) => (
                  <td key={w.week}>-</td>
                ))}
              </tr>
              <tr>
                <td>RM Sorting & FG Wearhouse</td>
                {weeksandmonths.flatMap((w) => (
                  <td key={w.week}>-</td>
                ))}
              </tr>
              <tr>
                <td>Containment Back up</td>
                {weeksandmonths.flatMap((w) => (
                  <td key={w.week}>-</td>
                ))}
              </tr>
              <tr>
                <td>Excess</td>
                {weeksandmonths.flatMap((w) => (
                  <td key={w.week}>-</td>
                ))}
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
              <tr style={{background:'orangered'}}>
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

export default Quality;
