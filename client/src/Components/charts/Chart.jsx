import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const LineChartComponent = ({ dataset }) => {
  const labels = Object.keys(dataset).map((key) => key.split('-')[3]);
  console.log(Object.values(dataset))
      
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Gap',
        data: Object.values(dataset),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Gap Over Weeks',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default LineChartComponent;