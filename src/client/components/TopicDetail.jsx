import React from 'react';
import { useEffect, useState } from 'react';
import { Typography, Box, Divider } from '@mui/material';
import axios from 'axios';
const TopicDetail = ({ topic, cluster }) => {
  const [topicMetric, setTopicMetric] = useState({});
  console.log(cluster);
  useEffect(() => {
    axios
      .post('/jmx/topicMetrics', {
        broker: cluster.prometheusUrl,
        topic: topic,
      })
      .then((response) => {
        console.log(response.data.data);
        setTopicMetric(response.data);
      });
  }, []);
  return (
    <Box sx={{ overflowY: 'scroll', maxHeight: '300px' }}>
      {topicMetric.data?.result.map((metric) => {
        return (
          <Box sx={{ textAlign: 'left' }}>
            <Divider />
            <Typography>
              <b>Partition:</b> {`${metric?.metric.partition}`}
            </Typography>
            <Typography>
              <b>Offset:</b> {`${metric?.value[1]}`}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default TopicDetail;
