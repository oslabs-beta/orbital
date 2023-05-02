import axios from 'axios';
import { useEffect, useState } from 'react';
import CpuMetrics from '../allMetrics/CpuMetrics';
import RamMetrics from '../allMetrics/RamMetrics';
import BytesMetrics from '../allMetrics/BytesMetrics';
import {
  Box,
  Button,
  Modal,
  Typography,
  Card,
  TextField,
  CardContent,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NetworkMetrics from '../allMetrics/NetworkMetrics';
import CreateAlertModal from './CreateAlertModal';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',

    backgroundSize: 'cover',
    backgroundPosition: 'center',
    overflow: 'hidden',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    width: '100%',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    padding: '16px',
  },
  input: {
    marginBottom: '16px',
  },
  submitButton: {
    marginTop: '16px',
    marginBottom: '8px',
    backgroundColor: '#227BA5',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#1D6490',
    },
  },
  signupLink: {
    color: '##227BA5',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
    cursor: 'pointer',
  },
};

const ClusterOverview = ({
  cluster,
  setUpdatingCluster,
  clusterId,
  setCluster,
  setIntervalId,
}) => {
  const [metrics, setMetrics] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(cluster?.name);
  const [promUrl, setPromUrl] = useState(cluster?.prometheusUrl);
  const [deleteModal, setDeleteModal] = useState(false);
  const [confirmDeleteName, setConfirmDeleteName] = useState('');
  const [showAlertModal, setShowAlertModal] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (!cluster) return;

    setName(cluster.name);
    setPromUrl(cluster.prometheusUrl);
  }, [cluster]);

  useEffect(() => {
    if (!cluster) return;
    const id = setInterval(() => {
      axios
        .post('/jmx/metrics', {
          broker: cluster.prometheusUrl,
          userId: localStorage.getItem('userId'),
        })
        .then((res) => {
          setMetrics(res.data);
          console.log(res.data);
        });
    }, 1500);
    setIntervalId(id);
    return () => clearInterval(id);
  }, [cluster]);

  const handleUpdateCluster = async () => {
    try {
      setUpdatingCluster(true);
      const response = await axios.patch('/cluster', {
        cluster_id: cluster._id,
        cluster_name: name,
        prom_port: promUrl,
      });
      setCluster(response.data);

      setUpdatingCluster(false);

      setShowModal(false);
    } catch (e) {
      console.error('Error in ClusterOverview.jsx: Line 82');
    }
  };
  const handleDeleteCluster = async () => {
    if (cluster.name !== confirmDeleteName) {
      return;
    }
    try {
      setUpdatingCluster(true);
      const response = await axios.delete(`/cluster/${cluster._id}`);

      setDeleteModal(false);
      window.location.reload();
    } catch (e) {
      console.error(
        `Error in handleUpdateCluster function in Cluster Overview.jsx: ${e}`
      );
    }
  };

  return !cluster ? (
    <div></div>
  ) : (
    <>
      <CreateAlertModal
        showModal={showAlertModal}
        setShowModal={setShowAlertModal}
      />

      <Box
        sx={{
          textAlign: 'center',
          p: 2,
          ml: '10vw',
          backgroundColor: 'rgb(24, 45, 91)',
        }}
      >
        <Button
          sx={{ marginRight: 5 }}
          variant='contained'
          color='secondary'
          onClick={() => setShowAlertModal(true)}
        >
          Set Up Alerts
        </Button>
        <Button
          sx={{ marginRight: 5 }}
          variant='contained'
          color='secondary'
          onClick={() => navigate(`/cluster/${cluster._id}`)}
        >
          More Details
        </Button>
        <Button
          sx={{ marginRight: 5 }}
          variant='contained'
          color='secondary'
          onClick={() => setShowModal(true)}
        >
          Edit Cluster
        </Button>
        <Modal
          open={showModal}
          aria-labelledby='parent-modal-title'
          aria-describedby='parent-modal-description'
          sx={{
            width: 500,
            height: 500,
            margin: 'auto',
          }}
        >
          <Card sx={styles.card}>
            <CardContent>
              <Typography
                variant='h5'
                sx={{
                  textAlign: 'center',
                }}
              >
                Edit Cluster
              </Typography>
              <TextField
                sx={styles.input}
                label='Cluster Name'
                variant='outlined'
                size='small'
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                sx={styles.input}
                label='Enter Brokers'
                variant='outlined'
                size='large'
                multiline
                rows={5}
                fullWidth
                value={promUrl}
                onChange={(e) => setPromUrl(e.target.value)}
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Button onClick={() => setShowModal(false)}>Cancel</Button>
                <Button
                  sx={styles.submitButton}
                  variant='contained'
                  onClick={handleUpdateCluster}
                >
                  Confirm Changes
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Modal>
        <Button
          variant='contained'
          sx={{
            backgroundColor: 'darkred',
            ':hover': { backgroundColor: 'darkred' },
          }}
          onClick={() => setDeleteModal(true)}
        >
          Delete Cluster
        </Button>
        <Modal
          open={deleteModal}
          aria-labelledby='parent-modal-title'
          aria-describedby='parent-modal-description'
          sx={{
            width: 500,
            height: 500,
            margin: 'auto',
          }}
        >
          <Card sx={styles.card}>
            <CardContent>
              <Typography
                variant='h5'
                sx={{
                  textAlign: 'center',
                }}
              >
                Delete Cluster
              </Typography>
              <TextField
                sx={styles.input}
                label='Verify Cluster Name'
                variant='outlined'
                size='small'
                fullWidth
                value={confirmDeleteName}
                onChange={(e) => setConfirmDeleteName(e.target.value)}
              />

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  backgroundColor: 'rgb(24, 45, 91)',
                }}
              >
                <Button onClick={() => setDeleteModal(false)}>Cancel</Button>
                <Button
                  sx={{
                    backgroundColor: 'maroon',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'darkred',
                    },
                  }}
                  onClick={handleDeleteCluster}
                >
                  Delete
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Modal>
      </Box>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '20px',
          gap: 10,
          backgroundColor: 'rgb(24, 45, 91)',
          margin: 'auto',
        }}
      >
        <Box sx={{ ml: '10vw' }}>
          <CpuMetrics cpuMetrics={metrics.cpumetric} />
          <BytesMetrics
            bytesOutMetrics={metrics.bytesOutMetric}
            bytesInMetrics={metrics.bytesintotalmetric}
          />
        </Box>
        <Box>
          <RamMetrics ramUsage={metrics.ramUsageMetric} />
          <NetworkMetrics latency={metrics.latency} />
        </Box>
      </div>
    </>
  );
};

export default ClusterOverview;
