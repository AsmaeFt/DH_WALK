import React from "react";
import c from "../FinalAssembl/FinalAssembly.module.css";
import TableHeader from "../UI/TableHeader";
import { generateWeeks } from "../functions/utilis";
import { useSelector } from "react-redux";

const Quality = () => {
  const weeks = generateWeeks();
  const data = useSelector((s) => s.projectData.data);
  console.log(data);

  let containtion = [];
  let Quality_Project_DH = [];

  data.map((d) => {
    d.weeks.map((w) => {
      let Total = 0;
      w.projectData.map((pr) => {
        if (pr.family.length < 4) {
          pr.family.map((f) => {
            const totalContaintion = f.crews * f.Containment;
            Total += totalContaintion;
            if (!containtion[f.name]) {
              containtion[f.name] = [];
            }
            containtion[f.name].push(totalContaintion);
          });
        } else {
          const totalContaintion = pr.family.reduce(
            (acc, f) => acc + f.crews * f.Containment,
            0
          );
          Total += totalContaintion;

          if (!containtion[pr.projectName]) {
            containtion[pr.projectName] = [];
          }
          containtion[pr.projectName].push(totalContaintion);
        }
      });
      Quality_Project_DH.push(Total);
    });
  });

  console.log(Quality_Project_DH);

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
                {Quality_Project_DH.map((t, i) => (
                  <td key={i}>{t}</td>
                ))}
              </tr>
              {Object.entries(containtion).map(([name, value], i) => (
                <tr key={i}>
                  <td>{name}</td>
                  {value.map((v, j) => (
                    <td key={j}>{v}</td>
                  ))}
                </tr>
              ))}
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
