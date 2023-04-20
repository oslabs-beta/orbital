import React, { useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Card, CardHeader } from '@mui/material';

const CpuMetrics = ({ cpuMetrics }) => {
  //   const [currentUsage, setCurrentUsage] = useState(0);
  const cpuMetric = cpuMetrics?.data?.result[0].value[1] * 100;

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
        max: 100,
        ticks: {
          stepSize: 10, // Adjust this to reflect the units you want to display
          beginAtZero: true,
        },
        title: {
          display: true,
          text: 'Percentage',
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
        label: 'Current CPU',
        data: [cpuMetric],
        backgroundColor: 'rgba(150, 149, 255, 0.5)',
      },
    ],
  };

  return (
    <Card sx={{ width: 500, mb: 2, boxShadow: '0px 0px 4px black' }}>
      <CardHeader title='CPU Metrics' style={{ textAlign: 'center' }} />
      <Bar
        options={options}
        data={data}
        style={{ margin: 'auto', height: 'auto', width: 500 }}
      />
    </Card>
  );
};

export default CpuMetrics;
