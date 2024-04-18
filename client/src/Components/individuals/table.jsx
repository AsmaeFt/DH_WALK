import React, { useState } from 'react';

const Table = () => {
  const [tableData, setTableData] = useState(() => {
    const currentYear = new Date().getFullYear();
    const weeksInYear = 52; // Assuming a standard year has 52 weeks

    const data = [['', ...Array.from({ length: weeksInYear }, (_, i) => `Week ${i + 1}`)]];
    data.push(['Header 1', ...Array(weeksInYear).fill('')]);
    data.push(['Header 2', ...Array(weeksInYear).fill('')]);
    data.push(['Header 3', ...Array(weeksInYear).fill('')]);

    return data;
  });

  const handleInputChange = (row, col, value) => {
    const newTableData = [...tableData];
    newTableData[row][col] = value;

    // Copy the input value to the next cells in the same row
    for (let i = col + 1; i < newTableData[row].length; i++) {
      newTableData[row][i] = value;
    }

    setTableData(newTableData);
  };

  return (
    <table>
      <thead>
        <tr>
          {tableData[0].map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.slice(1).map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <td key={colIndex}>
                {colIndex === 0 ? (
                  cell
                ) : (
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) =>
                      handleInputChange(rowIndex + 1, colIndex, e.target.value)
                    }
                  />
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;