import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Card, CardHeader } from "@mui/material";

const BytesMetrics = () => {
  const chartRef = useRef(null);
  const [labels, setLabels] = useState(["1", "2", "3", "4", "5", "6", '7', '8', '9', '10', '11', '12', '13', '14', '15']);
  const [bytesIn, setBytesIn] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [bytesOut, setBytesOut] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);


  useEffect(() => {
    const id = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * 25) + 1;
      setBytesIn([...bytesIn.slice(1), randomNumber])

      randomNumber = Math.floor(Math.random() * 25) + 1;
      setBytesOut([...bytesOut.slice(1), randomNumber])
    }, 1000);
    return () => clearInterval(id);
  })

  useEffect(() => {
    const chartCtx = chartRef.current.getContext("2d");

    // Create chart instance
    const chart = new Chart(chartCtx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Bytes In",
            data: bytesIn,
            borderColor: "rgba(255, 206, 86, 1)",
            backgroundColor: "rgba(255, 206, 86, 0.2)",
            pointBackgroundColor: "rgba(255, 206, 86, 1)",
            pointBorderColor: "rgba(255, 206, 86, 1)",
            borderWidth: 3,
          },
          {
            label: "Bytes Out",
            data: bytesOut,
            borderColor: "rgba(54, 162, 235, 1)",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            pointBackgroundColor: "rgba(54, 162, 235, 1)",
            pointBorderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 3,
          },
        ],
      },
      options: {
        scales: {
          y: {
            max: 100,
            title: {
              display: true,
              text: "Bytes",
              font: {
                size: 14,
              },
            },
          },
          x: {
            title: {
              display: true,
              text: "Seconds",
              font: {
                size: 14,
              },
            },
          }
        },
        animation: false
      },
      title: {
        display: true,
        text: (ctx) => 'Point Style: ' + ctx.chart.data.datasets[0].pointStyle,
      }
    });
    
    // Destroy previous chart instance before creating a new one
    return () => {
      chart.destroy();
    };
  }, [bytesIn, bytesOut]);

  return (
    <Card sx={{width: 500, boxShadow: '0px 0px 4px black'}}>
      <CardHeader title="Bytes Metrics" style={{ textAlign: "center" }} />
      <canvas ref={chartRef} style={{width: 500}} />
    </Card>
  )
};

export default BytesMetrics;