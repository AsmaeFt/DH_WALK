import React from "react";
import c from "../FinalAssembl/FinalAssembly.module.css";
import TableHeader from "../UI/TableHeader";
import { generateWeeks } from "../functions/utilis";
import { useSelector } from "react-redux";

const Quality = () => {
  const weeks = generateWeeks();
  const data = useSelector((s) => s.projectData.data);
  console.log(data);

  let containtion = {};
  const families = ["HAB-K9", "PPL-K9", "PDB-K9"];
  
  data.map((d) => {
    d.weeks.map((w) => {
      w.projectData.map((pr) => {
        pr.family.map((f) => {
          if (families.includes(f.name)) {
            const totalContaintion = f.crews * f.Containment;
            if (!containtion[f.name]) {
              containtion[f.name] = [];
            }
            containtion[f.name].push(totalContaintion);
          }
        });
      });
    });
  });
  
  console.log(containtion);


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
                <td>Quality DH Required</td>
                {weeks.map((w, i) => (
                  <td key={i}>-</td>
                ))}
              </tr>
            </React.Fragment>

            <React.Fragment>
              <tr className={c.total}>
                <td>Quality Project DH</td>
                {weeks.map((w, i) => (
                  <td key={i}>-</td>
                ))}
              </tr>
              <tr>
                <td> K9 PPL Containment</td>
              </tr>
              <tr>
                <td> K9 HAB Containment</td>
              </tr>
              <tr>
                <td> K9 PDB Containment</td>
              </tr>
              <tr>
                <td> K9 Batch Containment</td>
              </tr>
              <tr>
                <td> K9 B78 Containment</td>
              </tr>
              <tr>
                <td> R8 Containment</td>
              </tr>
              <tr>
                <td> X74 Containment</td>
              </tr>
            </React.Fragment>

            <React.Fragment>
              <tr className={c.total}>
                <td>Quality Other DH</td>
                {weeks.map((w, i) => (
                  <td key={i}>-</td>
                ))}
              </tr>
              <tr>
                <td>Supper Control</td>
              </tr>
              <tr>
                <td>Fire Wall</td>
              </tr>
              <tr>
                <td>Validation</td>
              </tr>
              <tr>
                <td>Validation</td>
              </tr>
              <tr>
                <td> FTQ Data Recording</td>
              </tr>
              <tr>
                <td> RM Sorting & FG Wearhouse</td>
              </tr>
              <tr>
                <td> Containment Back up</td>
              </tr>
              <tr>
                <td> Excess</td>
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

export default Quality;
