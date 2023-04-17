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
      title: {
        display: true,
        text: 'Current CPU Usage',
      },
    },
    scales: {
      y: {
        max: 100,
        ticks: {
          stepSize: 10, // Adjust this to reflect the units you want to display
          beginAtZero: true,
        },
      },
    },
  };

  const labels = ['CPU Usage %'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Current',
        data: labels.map(() => cpuMetric),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      // {
      //   label: 'Past Hour',
      //   data: labels.map(() => 92.8),
      //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
      // },
    ],
  };

  useEffect(() => {
    /*
		response example {
			"status":"success",
			"data":{
				"resultType":"vector",
				"result":[
					{
						"metric":{},
						"value":[1681327260.737,"0.06945679231863441"]
					}
				]
			}
		}
		*/

    const id = setInterval(() => {
      // fetch('http://localhost:3001/jmx/metrics', {
      // 		method: 'POST',
      // 		body: {broker: 'http://localhost:9090'},
      // 		// headers: {'Content-Type': 'application/json'}
      // })
      //  .then(res => res.json())
      // 	.then(json => {
      // 	setCurrentUsage(json.data.result[0].value[1] * 100)
      // 	})
      //   console.log(cpuMetrics?.data.result[0].value[1]);
      //   const mockResponse = {
      //     status: 'success',
      //     data: {
      //       resultType: 'vector',
      //       result: [
      //         {
      //           metric: {},
      //           value: [1681327260.737, '0.06945679231863441'],
      //         },
      //       ],
      //     },
      //   };
      //   setCurrentUsage(cpuMetrics?.data?.result[0].value[1] * 100);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <Bar
        options={options}
        data={data}
        style={{ margin: 'auto', height: 'auto', width: 500 }}
      />
    </div>
  );
};

export default CpuMetrics;
