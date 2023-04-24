import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { Card, CardHeader } from '@mui/material';

const BytesMetrics = ({ bytesOutMetrics, bytesInMetrics }) => {
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
  const [bytesInData, setBytesInData] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [bytesOutData, setBytesOutData] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newBytesInValue = bytesInMetrics?.data?.result[0].value[1];
      const newBytesOutValue = bytesOutMetrics?.data?.result[0].value[1];
      setBytesInData([...bytesInData.slice(1), newBytesInValue]);
      setBytesOutData([...bytesOutData.slice(1), newBytesOutValue]);
    }, 1000);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    const chartCtx = chartRef.current.getContext('2d');

    // Create chart instance
    const chart = new Chart(chartCtx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Bytes In',
            data: bytesInData,
            borderColor: '#9695ff',
            backgroundColor: 'rgba(150, 149, 255, 0.2)',
            pointBackgroundColor: '#ffffff',
            pointBorderColor: '#484995',
            borderWidth: 3,
          },
          {
            label: 'Bytes Out',
            data: bytesOutData,
            borderColor: '#6968d4',
            backgroundColor: 'rgba(105, 104, 212, 0.2)',
            pointBackgroundColor: '#ffffff',
            pointBorderColor: '#1f2044',
            borderWidth: 3,
          },
        ],
      },
      options: {
        scales: {
          y: {
            max: 5000,
            min: 0,
            ticks: {
              stepSize: 150,
              beginAtZero: true,
            },
            title: {
              display: true,
              text: 'Bytes',
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
        plugins: {
          legend: {
            display: true,
            labels: {
              font: {
                size: 14,
              },
            },
          },
          tooltip: {
            titleFont: {
              size: 16,
            },
            bodyFont: {
              size: 14,
            },
          },
        },
        backgroundColor: 'rgba(105, 104, 212, 0.2)',
      },
      title: {
        display: true,
        text: (ctx) => 'Point Style: ' + ctx.chart.data.datasets[0].pointStyle,
      },
    });

    // Destroy previous chart instance before creating a new one
    return () => {
      chart.destroy();
    };
  }, [bytesInData, bytesOutData]);

  return (
    <Card sx={{ width: 500, boxShadow: '0px 0px 4px black' }}>
      <CardHeader title='Bytes In/Out' style={{ textAlign: 'center' }} />
      <canvas ref={chartRef} style={{ width: 500 }} />
    </Card>
  );
};

export default BytesMetrics;
