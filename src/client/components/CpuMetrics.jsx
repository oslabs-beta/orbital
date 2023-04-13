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


const CpuMetrics = () => {

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
				position: 'top'
			},
			title: {
				display: true,
				text: 'Current CPU Usage',
			},
		},
	};

	const labels = ['CPU Usage %'];

  const data = {
  labels,
  datasets: [
    {
      label: 'Current',
      data: labels.map(() => 6.4),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Past Hour',
      data: labels.map(() => 92.8),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

	useEffect(() => {
		fetch('http://localhost:3001/jmx/metrics', {
				method: 'POST', 
				body: {broker: 'http://localhost:9090'}, 
				// headers: {'Content-Type': 'application/json'}
		})
		  .then(res => res.json())
			.then(data => {
				console.log(data);
			})
	}, [])

 

  return (
    <div>
      <Bar options={options} data={data} style={{margin: 'auto'}} />
    </div>
  );
};

export default CpuMetrics;
