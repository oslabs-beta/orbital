import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { Card, CardHeader } from '@mui/material';

const ProducerMessMetrics = ({ prodMessMetrics }) => {
  const chartRef = useRef(null);
  const [labels, setLabels] = useState([
    '-15s',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    'Now',
  ]);
  
  // Declares initial state of zero for Producer Messages metric chart
  const [bytesInData, setBytesInData] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [bytesOutData, setBytesOutData] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

 // Updates Producer Messages chart data every second 
  useEffect(() => {
    const interval = setInterval(() => {
      const newBytesInValue = prodMessMetrics;
      setBytesInData([...bytesInData.slice(1), newBytesInValue]);
    }, 1000);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    const chartCtx = chartRef.current.getContext('2d');

  // Creates chart instance
    const chart = new Chart(chartCtx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Producer Messages',
            data: bytesInData,
            borderColor: 'rgba(255, 206, 86, 1)',
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            pointBackgroundColor: 'rgba(255, 206, 86, 1)',
            pointBorderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 3,
          },
        ],
      },
      options: {
        scales: {
          y: {
            max: (function () {
              const maxValue = Math.max(...bytesInData);
              if (maxValue < 5) return 10;
              if (maxValue >= 10 && maxValue < 1000) return maxValue + 10;
            })(),
            min: 0,
            ticks: {
              stepSize: 5,
              beginAtZero: true,
            },
            title: {
              display: true,
              text: 'Milliseconds',
              font: {
                size: 14,
              },
            },
          },
          x: {
            title: {
              display: true,
              text: 'Time',
              font: {
                size: 14,
              },
            },
          },
        },
        animation: false,
      },
      title: {
        display: true,
        text: (ctx) => 'Point Style: ' + ctx.chart.data.datasets[0].pointStyle,
      },
    });

  // Destroys previous chart instance before creating a new one with updated state
    return () => {
      chart.destroy();
    };
  }, [bytesInData, bytesOutData]);

  return (
    <Card sx={{ width: 500, boxShadow: '0px 0px 4px black' }}>
      <CardHeader title='Producer Messages' style={{ textAlign: 'center' }} />
      <canvas ref={chartRef} style={{ width: 500 }} />
    </Card>
  );
};

export default ProducerMessMetrics;