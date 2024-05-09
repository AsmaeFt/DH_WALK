import React, { useState } from "react";
import TableHeader from "../UI/TableHeader";
import c from "./FinalAssembly.module.css";
import { generateWeeks, getCurrentWeek } from "../functions/utilis";

const Project = ({ data , sproject }) => {
  let Total_os = [];
  let Total_slop = [];
  let ActualDh = [];

  const weeks = generateWeeks();

  data.map((pr) => {
    pr.projectData.map((p, i) => {
      const TotalOS =
        p.project_OS.Digitalization +
        p.project_OS.Daily_Kaizen +
        p.project_OS.OS_Auditing +
        p.project_OS.OS_Auditing_Data_Reporting;
      Total_os.push(TotalOS);

      const totalSLOP =
        p.project_special_list.Pregnant_women_out_of_the_plant +
        p.project_special_list.Maternity +
        p.project_special_list.Breastfeeding_leave +
        p.project_special_list.LTI_Long_term_weaknesses_LWD +
        p.project_special_list.Physical_incapacity_NMA;
      Total_slop.push(totalSLOP);

      let prev = 0;
      let actualdh;
      if (pr.week_name === `${new Date().getFullYear()}-W01`) {
        actualdh =
          p.project_actual_DH.last_HC -
          p.project_actual_DH.Attrition +
          p.project_actual_DH.Hiring -
          p.project_actual_DH.Transfer;
      } else {
        actualdh =
          prev -
          p.project_actual_DH.Attrition +
          p.project_actual_DH.Hiring -
          p.project_actual_DH.Transfer;
      }
      prev = actualdh;
      ActualDh.push(actualdh);
    });
  });

  console.log(ActualDh);
  return (
    <>
      <tbody>
        <React.Fragment>
          {/* header */}
          <tr>
            <td>
              <span style={{ color: "orangered" }}>{sproject}</span> DH Required
            </td>
          </tr>
          <tr>
            <td>
              <span style={{ color: "orangered" }}>{sproject}</span> Project
            </td>
          </tr>
        </React.Fragment>

        <React.Fragment>
          <tr className={c.total}>
            <td>
              <span style={{ color: "black" }}>{sproject}</span> OS
            </td>
            {Total_os.map((t, i) => (
              <td key={i}>{t}</td>
            ))}
          </tr>
          <tr>
            <td>Digitalization</td>
            {data.map((p) =>
              p.projectData.map((pr, i) => (
                <td key={i}>{pr.project_OS.Digitalization}</td>
              ))
            )}
          </tr>
          <tr>
            <td>Daily Kaizen</td>
            {data.map((p) =>
              p.projectData.map((pr, i) => (
                <td key={i}>{pr.project_OS.Daily_Kaizen}</td>
              ))
            )}
          </tr>
          <tr>
            <td>OS Auditing</td>
            {data.map((p) =>
              p.projectData.map((pr, i) => (
                <td key={i}>{pr.project_OS.OS_Auditing}</td>
              ))
            )}
          </tr>
          <tr>
            <td>OS Auditing & Data Reporting</td>
            {data.map((p) =>
              p.projectData.map((pr, i) => (
                <td key={i}>{pr.project_OS.OS_Auditing_Data_Reporting}</td>
              ))
            )}
          </tr>
        </React.Fragment>

        <React.Fragment>
          <tr className={c.total}>
            <td>{sproject} SLOP </td>
            {Total_slop.map((t, i) => (
              <td key={i}>{t}</td>
            ))}
          </tr>
          <tr>
            <td>Pregnant women out of the plant</td>
            {data.map((p) =>
              p.projectData.map((pr, i) => (
                <td key={i}>
                  {pr.project_special_list.Pregnant_women_out_of_the_plant}
                </td>
              ))
            )}
          </tr>
          <tr>
            <td>Maternity</td>
            {data.map((p) =>
              p.projectData.map((pr, i) => (
                <td key={i}>{pr.project_special_list.Maternity}</td>
              ))
            )}
          </tr>
          <tr>
            <td>Breastfeeding leave</td>
            {data.map((p) =>
              p.projectData.map((pr, i) => (
                <td key={i}>{pr.project_special_list.Breastfeeding_leave}</td>
              ))
            )}
          </tr>
          <tr>
            <td>LTI: Long term weaknesses, LWD, </td>
            {data.map((p) =>
              p.projectData.map((pr, i) => (
                <td key={i}>{pr.project_special_list.LTI_Long_term_weaknesses_LWD}</td>
              ))
            )}
          </tr>
          <tr>
            <td> Physical incapacity & NMA </td>
            {data.map((p) =>
              p.projectData.map((pr, i) => (
                <td key={i}>{pr.project_special_list.Physical_incapacity_NMA}</td>
              ))
            )}
          </tr>
        </React.Fragment>

        <React.Fragment>
          <tr className={c.total}>
            <td>{sproject} Actual DH</td>
            {
                ActualDh.map((a,i)=>(
                    <td key={i}>{a}</td>
                ))
            }
          </tr>
          <tr>
            <td>Attrition</td>
            {data.map((p) =>
              p.projectData.map((pr, i) => (
                <td key={i}>{pr.project_actual_DH.Attrition}</td>
              ))
            )}
          </tr>

          <tr>
            <td>Transfer</td>
            {data.map((p) =>
              p.projectData.map((pr, i) => (
                <td key={i}>{pr.project_actual_DH.Transfer}</td>
              ))
            )}
          </tr>

          <tr>
            <td>Hiring</td>
            {data.map((p) =>
              p.projectData.map((pr, i) => (
                <td key={i}>{pr.project_actual_DH.Hiring}</td>
              ))
            )}
          </tr>
        </React.Fragment>

      </tbody>
    </>
  );
};
export default Project;
