import React from 'react';
import { Bar } from 'react-chartjs-2';

const chartData = {
  labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [10, 20, 30, 40, 50],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
    {
      label: 'Dataset 2',
      data: [50, 40, 30, 20, 10],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
    // Add more datasets if needed
  ],
};

const chartOptions = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      labels: {
        // Set 'display' property to 'false' for the legend items you want to hide
        filter: (legendItem, chartData) =>
          !['Dataset 2', 'Dataset 3', 'Dataset 4'].includes(legendItem.text),
      },
    },
  },
};

const MyChart = () => {
  return (
    <div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default MyChart;
