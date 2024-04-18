import React, { useState, useEffect } from 'react';

const Table = () => {
  const [tableData, setTableData] = useState(() => {
    const weeksInYear = 52;
    const data = [
      ['', ...Array.from({ length: weeksInYear }, (_, i) => `W${i + 1}`)],
      ['DH Required', ...Array(weeksInYear).fill('')],
      ['project', ...Array(weeksInYear).fill('')],

      ['Project OS ', ...Array(weeksInYear).fill(''),
      [['Digitalization ', ...Array(weeksInYear).fill('')],
      ['Daily Kaizen ', ...Array(weeksInYear).fill('')],
      ['OS Auditing ', ...Array(weeksInYear).fill('')],
      ['OS Auditing & Data Reporting', ...Array(weeksInYear).fill('')]
     ]],
      
      
      ['Project SLOP ', ...Array(weeksInYear).fill('')],
      ['Pregnant women out of the plant ', ...Array(weeksInYear).fill('')],
      ['Maternity ', ...Array(weeksInYear).fill('')],
      ['Breastfeeding leave ', ...Array(weeksInYear).fill('')],
      ['LTI: Long term weaknesses, LWD, ', ...Array(weeksInYear).fill('')],
      ['Physical incapacity & NMA', ...Array(weeksInYear).fill('')],
      ['Actual DH ', ...Array(weeksInYear).fill('')],
      ['Attrition ', ...Array(weeksInYear).fill('')],
      ['Transfer ', ...Array(weeksInYear).fill('')],
      ['Hiring ', ...Array(weeksInYear).fill('')],
    ];
    return data;
  });

  useEffect(() => {
    const savedData = localStorage.getItem('tableData');
    if (savedData) {
      setTableData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tableData', JSON.stringify(tableData));
  }, [tableData]);

  const handleInputChange = (row, col, value) => {
    if (isNaN(value)) {
      alert('Please enter a valid number');
      return;
    }

    const newTableData = [...tableData];
    newTableData[row][col] = value;
    for (let i = col + 1; i < newTableData[row].length; i++) {
      newTableData[row][i] = value;
    }
    setTableData(newTableData);
  };

  const handleKeyDown = (row, col, e) => {
    if (e.key === 'ArrowUp' && row > 1) {
      e.preventDefault();
      handleInputChange(row - 1, col, e.target.value);
    } else if (e.key === 'ArrowDown' && row < tableData.length - 1) {
      e.preventDefault();
      handleInputChange(row + 1, col, e.target.value);
    } else if (e.key === 'ArrowLeft' && col > 0) {
      e.preventDefault();
      handleInputChange(row, col - 1, e.target.value);
    } else if (e.key === 'ArrowRight' && col < tableData[row].length - 1) {
      e.preventDefault();
      handleInputChange(row, col + 1, e.target.value);
    }
  };

 /*  const exportToCSV = () => {
    const csvData = tableData.map((row) => row.join(',')).join('\n');
    const csvFile = 'data.csv';
    const downloadLink = document.createElement('a');
    downloadLink.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvData));
    downloadLink.setAttribute('download', csvFile);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }; */

  return (
    <div>
      <table
        style={{
          borderCollapse: 'collapse',
          width: '100%',
          fontSize: '14px',
        }}
      >
        <thead>
          <tr>
            {tableData[0].map((header, index) => (
              <th
                key={index}
                style={{
                  padding: '10px',
                  border: '1px solid #ddd',
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  style={{
                    padding: '10px',
                    border: '1px solid #ddd',
                  }}
                >
                  {colIndex === 0 ? (
                    cell
                  ) : (
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) => handleInputChange(rowIndex + 1, colIndex, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(rowIndex + 1, colIndex, e)}
                      style={{
                        width: '100%',
                        border: 'none',
                        backgroundColor: 'transparent',
                      }}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
     {/*  <button onClick={exportToCSV}>Export to CSV</button> */}
    </div>
  );
};

export default Table;