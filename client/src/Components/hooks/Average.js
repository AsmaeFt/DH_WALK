


export const Calculate_Average = (dataList, weeks) => {
  let monthlyData = {};
  dataList.map((val, i) => {
   
    const { month } = weeks[i];
    
    if (!monthlyData[month]) {
        monthlyData[month] = { total: 0, count: 0 };
      }
    
    monthlyData[month].total += val;
    monthlyData[month].count++;
  });

  let averagePerMonth = {};
  for (let month in monthlyData) {
    const { total, count } = monthlyData[month];
    averagePerMonth[month] = Math.floor(total / count);
  }
  return averagePerMonth;
};
