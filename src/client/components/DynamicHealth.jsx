import { Grid, Box, Paper, Card, Typography } from '@mui/material';
import Chart from 'chart.js';
import ConsumerConvMetrics from '../allMetrics/consumerConvMetrics';
import ConsumerFailReqMetrics from '../allMetrics/consumerFailReqMetrics';
import ConsumerReqMetrics from '../allMetrics/consumerReqMetrics';
import ProducerConvMetrics from '../allMetrics/producerConvMetrics';
import ProducerMessMetrics from '../allMetrics/producerMessMetrics';
import ProducerReqMetrics from '../allMetrics/producerReqMetrics';
import { useState, useEffect } from 'react';
import axios from 'axios';
const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  gap: '10px',
  margin: 'auto',
  height: '100%',
};

const chartsContainerStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  padding: '16px',
  width: '80%',
  height: 'auto',
  margin: 'auto',
  marginTop: '50px',
};

const chartStyle = {
  width: '40%',
  height: '300px',
  marginBottom: '16px',
};

const metricsBoxStyle = {
  flex: 1,
  padding: '5px',
  width: '80%',
  margin: 'auto',
};

const HealthMetrics = ({ cluster, intervalId, setIntervalId }) => {
  const [moreMetrics, setMoreMetrics] = useState(0);
  useEffect(() => {
    if (!cluster) return;
    const id = setInterval(() => {
      axios
        .post('http://localhost:3001/jmx/producerConsumerMetrics', {
          broker: cluster.prometheusUrl,
          userId: localStorage.getItem('userId'),
        })
        .then((res) => {
          setMoreMetrics(res.data);
          console.log(res.data);
        });
    }, 1500);
    setIntervalId(id);
    return () => clearInterval(id);
  }, [cluster]);
  return (
    <Box style={containerStyle}>
      <Box style={chartsContainerStyle}>
        <Box style={chartStyle}>
          <ConsumerReqMetrics
            conReqMetrics={moreMetrics.consumerRequestsTotal}
          />
        </Box>
        <Box style={chartStyle}>
          <ProducerReqMetrics
            prodReqMetrics={moreMetrics.producerRequestsTotal}
          />
        </Box>
        <Box style={chartStyle}>
          <ConsumerFailReqMetrics
            conFailReqMetrics={moreMetrics.consumerFailedRequestsTotal}
          />
        </Box>
        <Box style={chartStyle}>
          <ProducerMessMetrics
            prodMessMetrics={moreMetrics.producersMessagesInTotal}
          />
        </Box>{' '}
        <Box style={chartStyle}>
          <ConsumerConvMetrics
            conConvMetrics={moreMetrics.consumerConversionsTotal}
          />
        </Box>
        <Box style={chartStyle}>
          <ProducerConvMetrics
            prodConvMetrics={moreMetrics.producerConversionsTotal}
          />
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
            <Typography variant='h5'>Consumer Requests</Typography>
            <Typography variant='h5' sx={{ textAlign: 'center' }}>
              {Math.round(moreMetrics.consumerRequestsTotal * 10) / 10}
            </Typography>
          </Card>
          <Card sx={{ border: 'none', boxShadow: 'none' }}>
            <Typography variant='h5'>Failed Requests</Typography>
            <Typography variant='h5' sx={{ textAlign: 'center' }}>
              {Math.round(moreMetrics.consumerFailedRequestsTotal * 10) / 10}
            </Typography>
          </Card>
          <Card sx={{ border: 'none', boxShadow: 'none' }}>
            <Typography variant='h5'>Consumer Conversions</Typography>
            <Typography variant='h5' sx={{ textAlign: 'center' }}>
              {Math.round(moreMetrics.consumerConversionsTotal * 10) / 10}
            </Typography>
          </Card>
          <Card sx={{ border: 'none', boxShadow: 'none' }}>
            <Typography variant='h5'>Producer Requests</Typography>
            <Typography variant='h5' sx={{ textAlign: 'center' }}>
              {Math.round(moreMetrics.producerRequestsTotal * 10) / 10}
            </Typography>
          </Card>
          <Card sx={{ border: 'none', boxShadow: 'none' }}>
            <Typography variant='h5'>Producer Messages</Typography>
            <Typography variant='h5' sx={{ textAlign: 'center' }}>
              {Math.round(moreMetrics.producersMessagesInTotal * 10) / 10}
            </Typography>
          </Card>
          <Card sx={{ border: 'none', boxShadow: 'none' }}>
            <Typography variant='h5'>Producer Conversions</Typography>
            <Typography variant='h5' sx={{ textAlign: 'center' }}>
              {Math.round(moreMetrics.producerConversionsTotal * 10) / 10}
            </Typography>
          </Card>
        </Paper>
      </Box>
    </Box>
  );
};

export default HealthMetrics;
