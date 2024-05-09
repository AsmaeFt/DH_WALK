import React from "react";
import { generateWeeks } from "../functions/utilis";
import c from "./FinalAssembly.module.css";
import api from "../../services/api";
const OS_afm = ({ project }) => {
  const weeksandmonths = generateWeeks();
  return (
    <>
      <tbody>
        <tr>
          <td>Proto & After Sales DH Required</td>
          {weeksandmonths.flatMap((w, i) => (
            <th key={w.week}>36</th>
          ))}
        </tr>
        <tr>
          <td>OS</td>
          {weeksandmonths.flatMap((w, i) => (
            <th style={{ backgroundColor: "black" }} key={w.week}>
              18
            </th>
          ))}
        </tr>
        {project.flatMap((pr, i) => (
          <tr key={i} className={c.total}>
            <td>{pr}</td>
            {weeksandmonths.flatMap((w, i) => {
              return <td key={w.week}>-</td>;
            })}
          </tr>
        ))}

        <tr>
          <td>After Sales</td>{" "}
          {weeksandmonths.flatMap((w, i) => (
            <td key={w.week}>21</td>
          ))}
        </tr>

        {project.flatMap((pr, i) => (
          <tr key={i}>
            <td>{pr}</td>
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default OS_afm;
