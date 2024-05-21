import c from "./Charts.module.css";
import { Bar, Line } from "react-chartjs-2";
import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  BarElement
);

const Chart = ({ data }) => {
  const BarChart = {
    labels: Object.keys(data),
    datasets: [
      {
        type: "bar",
        label: "",
        data: Object.values(data),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        hoverBackgroundColor: "#929D96",
        borderWidth: 1,
      },
    ],
  };
  const Options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {
            grid: {
                drawBorder: false,
                display: false,
            },
        },
        y: {
            grid: {
                drawBorder: false,
                display: true,
            },
        },
    },
    legend: { display: false },
    tooltips: { enabled: false },
    plugins: { 

        legend: {
            display: false,
        },
        title: {
            display: true,
            text: ' '
        },
       
        datalabels: {
            color: 'black',
            borderColor: '#000',
            'font-size': '600',
            anchor: 'end',
            align: 'top',
            formatter: (value) => {
                return value.y;
            }
        }
    }
}
  return (
    <React.Fragment>
      <Bar data={BarChart} options={Options} />
    </React.Fragment>
  );
};

export default Chart;
