import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const SeverityChart = () => {
  const data = {
    labels: ['Notice', 'Caution', 'Warning', 'Danger'],
    datasets: [
      {
        data: [25, 25, 25, 25],
        backgroundColor: ['#1abc9c', '#f39c12', '#e67e22', '#e74c3c'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    circumference: 180,
    rotation: 270,
    cutout: '50%',
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div>
      <h4>심각성 정도</h4>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default SeverityChart;
