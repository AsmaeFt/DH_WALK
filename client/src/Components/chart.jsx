import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const SemiCircularGaugeChart = () => {
  const data = {
    labels: ['Value', ''],
    datasets: [
      {
        data: [10, 50],
        backgroundColor: ['#FF6384', '#E0E0E0'],
        hoverBackgroundColor: ['#FF6384', '#E0E0E0'],
        borderWidth: 1,
        cutout: '90%',
        rotation: -90,
        circumference: 180,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div style={{ width: '10rem', height: '200px' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default SemiCircularGaugeChart;
