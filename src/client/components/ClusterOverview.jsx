import axios from 'axios';
import { useEffect, useState } from 'react';
import CpuMetrics from './CpuMetrics';

const ClusterOverview = ({ cluster }) => {
  const [metrics, setMetrics] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      axios
        .post('http://localhost:3001/jmx/metrics', { broker: 'localhost:9090' })
        .then((res) => {
          setMetrics(res.data);
          console.log(res.data.cpumetric.data.result[0].value[1]);
        });
    }, 1000);
    return () => clearInterval(id);
  });

  return (
    <>
      <div style={{ margin: 'auto' }}>{JSON.stringify(cluster)}</div>
      <CpuMetrics cpuMetrics={metrics.cpumetric} />
    </>
  );
};

export default ClusterOverview;
