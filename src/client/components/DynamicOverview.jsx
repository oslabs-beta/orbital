import { Box, Paper, Card, Typography } from '@mui/material';
import Chart from 'chart.js';
import CpuMetrics from '../allMetrics/CpuMetrics';
import RamMetrics from '../allMetrics/RamMetrics';
import NetworkMetrics from '../allMetrics/NetworkMetrics';
import BytesMetrics from '../allMetrics/BytesMetrics';
import { useState, useEffect } from 'react';
import axios from 'axios';
const containerStyle = {
  padding: '20px',
  margin: 'auto',
	marginLeft: 150,
	marginTop: 50,
};

const chartsContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: "40px",
  flexWrap: 'wrap',
  padding: '16px',
  alignItems: 'center'
};

const chartStyle = {
  width: '40%',
  height: '300px',
  marginBottom: '16px',
  marginRight: '30px'
};

const metricsBoxStyle = {
  flex: 1,
  padding: '5px',
  width: '60%',
  marginLeft: '20px'
};

const DynamicOverview = ({ cluster, intervalId, setIntervalId }) => {
  const [metrics, setMetrics] = useState(0);
  useEffect(() => {
    if (!cluster) return;
    const id = setInterval(() => {
      axios
        .post('http://localhost:3001/jmx/metrics', {
          broker: cluster.prometheusUrl,
          userId: localStorage.getItem('userId'),
        })
        .then((res) => {
          setMetrics(res.data);
        });
    }, 1500);
    setIntervalId(id);
    return () => clearInterval(id);
  }, [cluster]);

  return (
    <Box style={containerStyle}>
      <Box style={chartsContainerStyle}>
        <Box style={chartStyle}>
          <BytesMetrics
            bytesOutMetrics={metrics.bytesOutMetric}
            bytesInMetrics={metrics.bytesintotalmetric}
          />
        </Box>
        <Box style={chartStyle}>
          <RamMetrics ramUsage={metrics.ramUsageMetric} />
        </Box>
        <Box style={chartStyle}>
          <NetworkMetrics latency={metrics.latency} />
        </Box>
        <Box style={chartStyle}>
          <CpuMetrics cpuMetrics={metrics.cpumetric} />
        </Box>
      </Box>
      <Box style={metricsBoxStyle}>
        <Paper
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            boxShadow: `3px 3px 3px rgba(0, 0, 0, 0.5)`,
          }}
        >
         <Card sx={{ border: 'none', boxShadow: 'none' }}>
            <Typography variant='h5'>CPU</Typography>
            <Typography variant='h5' sx={{ textAlign: 'center' }}>
              {Number((metrics.cpumetric * 100).toFixed(2))}%
            </Typography>
          </Card>
          <Card sx={{ border: 'none', boxShadow: 'none' }}>
            <Typography variant='h5'>Ping</Typography>
            <Typography variant='h5' sx={{ textAlign: 'center' }}>
              {Math.round(Number(metrics.latency))}ms
            </Typography>
          </Card>
          <Card sx={{ border: 'none', boxShadow: 'none' }}>
            <Typography variant='h5'>RAM</Typography>
            <Typography variant='h5' sx={{ textAlign: 'center' }}>
              {Math.round(Number(metrics.ramUsageMetric) / 1000)}mb
            </Typography>
          </Card>
        </Paper>
      </Box>
    </Box>
  );
};

export default DynamicOverview;
