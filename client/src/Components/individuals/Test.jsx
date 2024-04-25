import React, { useState } from "react";
import { generateWeeks } from "../functions/utilis";


const Test = ({ family }) => {
  const weeksandmonths = generateWeeks();
  const [input, setinput] = useState(0);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Weeks</th>
            {weeksandmonths.flatMap((w, i) => (
              <th key={w.week}>{w.week}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Project DH required </td>
            {weeksandmonths.flatMap((w, i) => (
              <td key={w.week}>1</td>
            ))}
          </tr>
          <tr>
            <td>Project</td>
            {weeksandmonths.flatMap((w, i) => (
              <td key={w.week}>2</td>
            ))}
          </tr>
          {family.flatMap((f, i) => (
            <React.Fragment key={i}>
              <tr style={{ backgroundColor: "orangered" }}>
                <td>{f}</td>
                {weeksandmonths.flatMap((w, j) => (
                  <td key={`${i}-${j}`}>--</td>
                ))}
              </tr>
              <tr>
                <td>Indirects %</td>
                {weeksandmonths.flatMap((w, j) => (
                  <td key={`${i}-${j}`}>--</td>
                ))}
              </tr>
              <tr>
                <td>Crews</td>
                {weeksandmonths.flatMap((w, j) => (
                  <td key={`${i}-${j}`}>
                    <input
                      value={input}
                      onChange={(e) => setinput(e.target.value)}
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td>HC Crew</td>
                {weeksandmonths.flatMap((w, j) => (
                  <td key={`${i}-${j}`}>--</td>
                ))}
              </tr>
              <tr>
                <td>ME Definition</td>
                {weeksandmonths.flatMap((w, j) => (
                  <td key={`${i}-${j}`}>
                    <input value={input} />
                  </td>
                ))}
              </tr>
              <tr>
                <td>ME Support</td>
                {weeksandmonths.flatMap((w, j) => (
                  <td key={`${i}-${j}`}>
                    <input value={input} />
                  </td>
                ))}
              </tr>
              <tr>
                <td>Rework</td>
                {weeksandmonths.flatMap((w, j) => (
                  <td key={`${i}-${j}`}>
                    <input value={input} />
                  </td>
                ))}
              </tr>
              <tr>
                <td>Poly</td>
                {weeksandmonths.flatMap((w, j) => (
                  <td key={`${i}-${j}`}>
                    <input value={input} />
                  </td>
                ))}
              </tr>
              <tr>
                <td>Back-up</td>
                {weeksandmonths.flatMap((w, j) => (
                  <td key={`${i}-${j}`}>
                    <input value={input} />
                  </td>
                ))}
              </tr>
              <tr>
                <td>Containment</td>
                {weeksandmonths.flatMap((w, j) => (
                  <td key={`${i}-${j}`}>
                    <input value={input} />
                  </td>
                ))}
              </tr>
              <tr>
                <td>SOS</td>
                {weeksandmonths.flatMap((w, j) => (
                  <td key={`${i}-${j}`}>
                    <input value={input} />
                  </td>
                ))}
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Test;