import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Card, CardHeader } from '@mui/material';
import { Bar } from 'react-chartjs-2';

// Creates a chart instance for Ram metrics displaying a percentage for RAM usage
const RamMetrics = ({ ramUsage }) => {
  const ramUsageMetric = ramUsage / 1000 || 0;

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        max: 2000,
        ticks: {
          stepSize: 300,
          beginAtZero: true,
        },
        title: {
          display: true,
          text: 'Megabytes',
          font: {
            size: 14,
          },
        },
      },
    },
  };

  const data = {
    labels: [''],
    datasets: [
      {
        label: 'Current RAM Usage',
        data: [ramUsageMetric],
        backgroundColor: 'rgba(150, 149, 255, 0.5)',
      },
    ],
  };

  return (
    <Card sx={{ width: 500, mb: 2, boxShadow: '0px 0px 4px black' }}>
      <CardHeader title='RAM Usage' style={{ textAlign: 'center' }} />
      <Bar
        options={options}
        data={data}
        style={{ margin: 'auto', height: 'auto', width: 500 }}
      />
    </Card>
  );
};

export default RamMetrics;