import React, { useCallback, useEffect, useState } from "react";
import TableHeader from "../UI/TableHeader";
import { generateWeeks } from "../functions/utilis";
import c from "../FinalAssembl/FinalAssembly.module.css";
import api from "../../services/api";
import axios from "axios";
import { useSelector } from "react-redux";

const Dh_Walk = ({ data }) => {
  const dhWalkData = useSelector((state) => state.data);
  console.log(dhWalkData);
  const gweeks = generateWeeks();
  const total_Projects = data[0];
  const total_AFM = data[1];
  const total_Logistic = data[2];

  return (
    <>
      <div>
        <h2>DH WALK {new Date().getFullYear()} </h2>
      </div>
      <div className={c.table}>
        <table>
          <TableHeader />
          <tbody>
            <React.Fragment>
              <tr className={c.total}>
                <td>FA DH required </td>
                {gweeks.map((g, i) => (
                  <td key={i}>1841</td>
                ))}
              </tr>
            </React.Fragment>

            <React.Fragment>
              {Object.entries(total_Projects).map(([pr, val], i) => (
                <tr key={i}>
                  <td>{pr}</td>
                  {val.map((v, i) => (
                    <td key={i}>{v}</td>
                  ))}
                </tr>
              ))}
              <tr>
                <td>After M</td>
                {total_AFM.map((t, i) => (
                  <td key={i}>{t}</td>
                ))}
              </tr>
              <tr>
                <td>MPC</td>
                {total_Logistic.map((t, i) => (
                  <td key={i}>{t}</td>
                ))}
              </tr>
            </React.Fragment>

            <React.Fragment>
              <tr className={c.total}>
                <td>OS</td>
                {gweeks.map((g, i) => (
                  <td key={i}>-</td>
                ))}
              </tr>
              <tr>
                <td>Digitalization</td>
                {gweeks.map((g, i) => (
                  <td key={i}>-</td>
                ))}
              </tr>
              <tr>
                <td>Daily Kaizen</td>
                {gweeks.map((g, i) => (
                  <td key={i}>-</td>
                ))}
              </tr>
              <tr>
                <td>OS Data Reporting</td>
                {gweeks.map((g, i) => (
                  <td key={i}>-</td>
                ))}
              </tr>
            </React.Fragment>

            <React.Fragment>
              <tr className={c.total}>
                <td> FA Special list</td>
                {gweeks.map((g, i) => (
                  <td key={i}>-</td>
                ))}
              </tr>
              <tr>
                <td> Pregnant women out of the plant</td>
                {gweeks.map((g, i) => (
                  <td key={i}>-</td>
                ))}
              </tr>
              <tr>
                <td> Maternity</td>
                {gweeks.map((g, i) => (
                  <td key={i}>-</td>
                ))}
              </tr>
              <tr>
                <td> Breastfeeding leave</td>
                {gweeks.map((g, i) => (
                  <td key={i}>-</td>
                ))}
              </tr>
              <tr>
                <td> LTI: Long term weaknesses, LWD,</td>
                {gweeks.map((g, i) => (
                  <td key={i}>-</td>
                ))}
              </tr>
              <tr>
                <td> Physical incapacity & NMA</td>
                {gweeks.map((g, i) => (
                  <td key={i}>-</td>
                ))}
              </tr>
            </React.Fragment>

            <React.Fragment>
              <tr className={c.total}>
                <td> FA Actual DH</td>
                {gweeks.map((g, i) => (
                  <td key={i}>-</td>
                ))}
              </tr>
              <tr>
                <td>Attrition</td>
                {gweeks.map((g, i) => (
                  <td key={i}>-</td>
                ))}
              </tr>
              <tr>
                <td>Transfer</td>
                {gweeks.map((g, i) => (
                  <td key={i}>-</td>
                ))}
              </tr>
              <tr>
                <td>Hiring</td>
                {gweeks.map((g, i) => (
                  <td key={i}>-</td>
                ))}
              </tr>
            </React.Fragment>

            <tr className={c.total}>
              <td>FA GAP </td>
              {gweeks.map((g, i) => (
                <td key={i}>-</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dh_Walk;
