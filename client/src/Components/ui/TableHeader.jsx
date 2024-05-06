import React from 'react'
import { generateWeeks } from "../functions/utilis";
const TableHeader = () => {

    const weeksandmonths = generateWeeks();
  return (
    <thead>
    <tr>
      <td>Weeks</td>
      {weeksandmonths.flatMap((w, i) => (
        <td key={w.week}>{w.week}</td>
      ))}
    </tr>
  </thead>

  )
}

export default TableHeader