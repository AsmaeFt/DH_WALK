import React from "react";
import { generateWeeks, getWeek } from "../Components/functions/utilis";

const NewTablae = () => {
  generateWeeks();

  console.log(generateWeeks());
  const monthsandweeks = generateWeeks();
  return (
    <>
     
      <table>
        <thead>
          <tr>
            <th>months:</th>
            {monthsandweeks.flatMap((m, i) => (
              <th key={i}>{m.month}</th>
            ))}
          </tr>
          
          <tr>
            <th>date::</th>
            {monthsandweeks.flatMap((m, i) => (
              <th key={i}>{m.date}</th>
            ))}
          </tr>
          
          <tr>
            <th>weeks:</th>
            {monthsandweeks.flatMap((m, i) => (
              <th key={i}>{m.week}</th>
            ))}

          </tr>
        </thead>
        
        <tbody></tbody>
      </table>
    </>
  );
};

export default NewTablae;
