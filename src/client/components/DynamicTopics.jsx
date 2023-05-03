import {
  Paper,
  Typography,
  TextField,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState, useEffect } from 'react';
import TopicDetail from './TopicDetail';
import axios from 'axios';
const DynamicTopics = ({ cluster }) => {
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [topics, setTopics] = useState({
    resultType: 'vector',
    result: [
      {
        metric: {
          topic: '__consumer_offsets',
        },
        value: [1682963429.198, '50'],
      },
    ],
  });

  useEffect(() => {
    axios
      .post('/jmx/topics', {
        broker: cluster.prometheusUrl,
      })
      .then((response) => {
        setTopics(response.data);
        console.log(response.data);
      })
      .catch((e) => console.log(e));
  }, []);
  const [searchText, setSearchText] = useState('');
  return (
    <Paper
      sx={{
        width: '90%',
        height: '95%',
        marginLeft: '175px',
        marginTop: '55px',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <Typography component='header' variant='h4' sx={{ padding: '10px' }}>
        {' '}
        Search Topic
      </Typography>
      <TextField
        placeholder='Search'
        sx={{ width: '70%' }}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '75%',
          alignItems: 'center',
          marginLeft: '175px',
          mt: '20px',
        }}
      >
        {topics.data?.result
          .filter((value) => {
            if (searchText === '') {
              console.log(value);
              return value;
            } else if (
              value.metric.topic
                .toLowerCase()
                .includes(searchText.toLowerCase())
            ) {
              console.log(value);
              return value;
            }
          })
          .map((topic, index) => {
            return (
              <Accordion
                expanded={expanded === `${topic?.metric.topic}${index}`}
                onChange={handleChange(`${topic?.metric.topic}${index}`)}
                key={index}
                sx={{
                  width: '90%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  margin: '5px',
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`${topic?.metric.topic}${index}-content`}
                >
                  <Typography
                    sx={{
                      width: '33%',
                      flexShrink: 0,
                      fontWeight: 'bold',
                    }}
                  >
                    {topic?.metric.topic}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TopicDetail topic={topic?.metric.topic} cluster={cluster} />
                </AccordionDetails>
              </Accordion>
            );
          })}
      </Box>
    </Paper>
  );
};

export default DynamicTopics;
