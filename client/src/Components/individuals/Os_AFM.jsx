import React from "react";
import { generateWeeks } from "../functions/utilis";

const Os_AFM = ({ project, data }) => {
  const weeksandmonths = generateWeeks();
  return (
    <tbody>
      <tr>
        <td>Proto & After Sales DH Required</td>
        {weeksandmonths.flatMap((w, i) => (
          <th key={w.week}>36</th>
        ))}
      </tr>
      <tr>
        <td style={{ backgroundColor: "black" }}>OS</td>
        {weeksandmonths.flatMap((w, i) => (
          <th style={{ backgroundColor: "black" }} key={w.week}>15</th>
        ))}
      </tr>

      {project.flatMap((p, i) => (
        <tr key={i}>
          <td>{p}</td>
          {weeksandmonths.flatMap((w, i) => (
            <th key={w.week}>0</th>
          ))}
        </tr>
      ))}
      <tr>
        <td style={{ backgroundColor: "black" }}>After Sales</td>{" "}
        {weeksandmonths.flatMap((w, i) => (
          <th style={{ backgroundColor: "black" }} key={w.week}>21</th>
        ))}
      </tr>

      {project.flatMap((p, i) => (
        <tr key={i}>
          <td>{p}</td>
          {weeksandmonths.flatMap((w, i) => (
            <th key={w.week}>0</th>
          ))}
        </tr>
      ))}
      <tr>
        <td style={{ backgroundColor: "black" }}>
          After Sales Special list out of the plant
        </td>
        {weeksandmonths.flatMap((w, i) => (
            <th style={{ backgroundColor: "black" }} key={w.week}>0</th>
          ))}
      </tr>
      <tr>
        <td>Pregnant women out of the plant</td>
        {weeksandmonths.flatMap((w, i) => (
            <th key={w.week}>0</th>
          ))}
      </tr>
      <tr>
        <td>Maternity</td>
        {weeksandmonths.flatMap((w, i) => (
            <th key={w.week}>0</th>
          ))}
      </tr>
      <tr>
        <td>Breastfeeding leave</td>
        {weeksandmonths.flatMap((w, i) => (
            <th key={w.week}>0</th>
          ))}
      </tr>
      <tr>
        <td>LTI: Long term weaknesses, LWD</td>
        {weeksandmonths.flatMap((w, i) => (
            <th key={w.week}>0</th>
          ))}
      </tr>
      <tr>
        <td>Physical incapacity & NMA</td>
        {weeksandmonths.flatMap((w, i) => (
            <th key={w.week}>0</th>
          ))}
      </tr>
      <tr>
        <td style={{ backgroundColor: "black" }}>After Sales Actual DH</td>
        {weeksandmonths.flatMap((w, i) => (
            <th style={{ backgroundColor: "black" }} key={w.week}>42</th>
          ))}
      </tr>
      <tr>
        <td>Attrition</td>
        {weeksandmonths.flatMap((w, i) => (
            <th key={w.week}>0</th>
          ))}
      </tr>
      <tr>
        <td>Transfer</td>
        {weeksandmonths.flatMap((w, i) => (
            <th key={w.week}>0</th>
          ))}
      </tr>
      <tr>
        <td>Hiring</td>
        {weeksandmonths.flatMap((w, i) => (
            <th key={w.week}>0</th>
          ))}
      </tr>
    </tbody>
  );
};

export default Os_AFM;
