import axios from 'axios';
import { useEffect, useState } from 'react';
import CpuMetrics from './CpuMetrics';
import { Box, Button, Modal, Typography, Card, TextField, CardContent } from '@mui/material';

const styles = {
  root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",

      backgroundSize: "cover",
      backgroundPosition: "center",
      overflow: "hidden",
  },
  card: {
      backgroundColor: "white",
      borderRadius: "8px",
      width: "100%",
      boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
      padding: "16px",
  },
  input: {
      marginBottom: "16px",
  },
  submitButton: {
      marginTop: "16px",
      marginBottom: "8px",
      backgroundColor: "#227BA5",
      color: "#ffffff",
      "&:hover": {
          backgroundColor: "#1D6490",
      },
  },
  signupLink: {
      color: "##227BA5",
      textDecoration: "none",
      "&:hover": {
          textDecoration: "underline",
      },
      cursor: "pointer",
  },
};

const ClusterOverview = ({ cluster }) => {
  const [metrics, setMetrics] = useState(0);
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
  if (!cluster) return;  
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
      <Box>
        <Button variant='contained' onClick={() => setShowModal(true)}>Edit Cluster</Button>
        <Modal
          open={showModal}
          // onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
          sx={{
              width: 500,
              height: 500,
              margin: "auto",
          }}
        >
          <Card sx={styles.card}>
              <CardContent>
                  <Typography
                      variant="h5"
                      sx={{
                          mb: "16px",
                          textAlign: "center",
                      }}
                  >
                      Edit Cluster
                      <Button onClick={() => setShowModal(false)}>x</Button>
                  </Typography>
                  <TextField
                      sx={styles.input}
                      label="Cluster Name"
                      variant="outlined"
                      size="small"
                      fullWidth
                      // onChange={(e) =>
                      //     setClusterName(e.target.value)
                      // }
                  />
                  <TextField
                      sx={styles.input}
                      label="Enter Brokers"
                      variant="outlined"
                      size="large"
                      multiline
                      rows={5}
                      fullWidth
                      // onChange={(e) =>
                      //     setBrokers(e.target.value)
                      // }
                  />
                  <Button
                      sx={styles.submitButton}xxx
                      variant="contained"
                      size="large"
                      fullWidth
                      // onClick={handleCreateCluster}
                  >
                      Confirm Changes
                  </Button>
              </CardContent>
          </Card>
      </Modal>
      <Button variant='contained' sx={{backgroundColor: 'darkred', ":hover": {backgroundColor: 'darkred'}}}>Delete Cluster</Button>
      </Box>
      <div style={{ margin: 'auto' }}>{JSON.stringify(cluster)}</div>
      <CpuMetrics cpuMetrics={metrics.cpumetric} />
    </>
  );
};

export default ClusterOverview;
