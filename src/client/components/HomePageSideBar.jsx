import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Modal } from '@mui/material';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { Paper } from '@mui/material';
import { Card, CardContent, TextField } from '@mui/material';
import axios from 'axios';
import ClusterOverview from './ClusterOverview';
import SchemaIcon from '@mui/icons-material/Schema';
import LogoutButton from './LogoutButton';
import AddIcon from '@mui/icons-material/Add';
import './drawercss.css'

const drawerWidth = 250;

const styles = {
  paper: {
    backgroundColor: 'black', // Change this to the color you want
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
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      backgroundColor: '#484995',
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  backgroundColor: '#444444',
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: '#444444',
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  backgroundColor: '#444444'
}));

export default function PersistentDrawerLeft({user}) {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [clusterName, setClusterName] = useState('');
  const [brokers, setBrokers] = useState('');
  const [currentCluster, setCurrentCluster] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userClusters, setUserClusters] = useState([]);
  const [updatingCluster, setUpdatingCluster] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const handleClose = () => {
    setShowModal(false);
  };
  const handleOpen = () => {
    setShowModal(true);
  };

  // Get array of clusters based on userID
  useEffect(() => {
    console.log('useEffect GETS CLUSTER ARRAY fired.');
    try {
      axios
        .get(`http://localhost:3001/cluster/${localStorage.getItem('userId')}`)
        .then((response) => {
          setUserClusters(response.data);
          console.log(response.data);
        });
    } catch (e) {
      console.error('Error in HomePageSideBar.jsx: Lines 143 - 155');
    }
  }, [showModal, updatingCluster]);

  const handleCreateCluster = async () => {
    await axios.post('http://localhost:3001/cluster', {
      cluster_name: clusterName,
      prom_port: brokers,
      owner: localStorage.getItem('userId'),
    });
    setShowModal(false);
  };

  return (
    <Box sx={{ display: 'flex', boxSizing: 'border-box', fontWeight: 'bold' }}>
      <CssBaseline />
      <AppBar position='fixed' open={open} sx={{borderBottom: '1px solid black'}}>
        <Toolbar>
          <Typography sx={{m: 'auto', textAlign: 'right'}} variant='h6' noWrap component='div'>
            {currentCluster?.name || 'Select a cluster'}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
      className='custom-Drawer'
        sx={{
          width: drawerWidth,
          height: '100vh',
          backgroundColor: 'black',
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerHeader
          sx={{
            // background color for top left Orbital text
            backgroundColor: '#444444',
						p: 2
          }}
        >
          <Typography
            variant='h6'
            noWrap
            component='div'
            textAlign='center'
            color='white'
            margin='auto'
            fontWeight='bold'
          >
            {'Orbital'}
          </Typography>
        </DrawerHeader>
        <Divider sx={{backgroundColor: 'black'}} />
        <List sx={{backgroundColor: '#484995', color:'white'}}>
          <ListItem disablePadding>
            <ListItemButton onClick={handleOpen}>
              <ListItemText primary='Add New Cluster' />
							<AddIcon />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider sx={{backgroundColor: 'black'}} />
        <List sx={{backgroundColor: '#484995', p: 3, height: '100vh'}}>
          {userClusters.map((cluster, index) => {
            const icon = <SchemaIcon />;

            return (
              <ListItem key={cluster._id} disablePadding sx={{backgroundColor: '#484995', color: 'white'}}>
                <ListItemButton
                  onClick={() => {
                    setCurrentCluster(cluster);
                    setCurrentIndex(index);
                    clearInterval(intervalId)
                  }}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <Typography
                    variant='h6'
                    component='div'
                    color='white'
                    fontWeight={500}
                  >
                    {cluster.name}
                  </Typography>
                  
                </ListItemButton>
              </ListItem>
            );
          })}
          <Divider sx={{borderColor: 'black'}} />
          <LogoutButton />
        </List>
      </Drawer>
      <Main open={open} >
        <DrawerHeader sx={{backgroundColor: '#484995'}} />
        <Box
          sx={{
            width: '500px',
            backgroundColor: '#484995'
          }}
        >
          {showModal && (
            <Modal
              open={true}
              onClose={handleClose}
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
                      mb: '16px',
                      textAlign: 'center',
                    }}
                  >
                    Create Cluster
                  </Typography>
                  <TextField
                    sx={styles.input}
                    label='Cluster Name'
                    variant='outlined'
                    size='small'
                    fullWidth
                    onChange={(e) => setClusterName(e.target.value)}
                  />
                  <TextField
                    sx={styles.input}
                    label='Enter Brokers'
                    variant='outlined'
                    size='large'
                    multiline
                    rows={5}
                    fullWidth
                    onChange={(e) => setBrokers(e.target.value)}
                  />
                  <Button
                    sx={styles.submitButton}
                    variant='contained'
                    size='large'
                    fullWidth
                    onClick={handleCreateCluster}
                  >
                    Create
                  </Button>
                </CardContent>
              </Card>
            </Modal>
          )}
        </Box>
        <ClusterOverview
          cluster={currentCluster}
          index={currentIndex}
          setUpdatingCluster={setUpdatingCluster}
          setCluster={setCurrentCluster}
          setIntervalId={setIntervalId}
        />
      </Main>
    </Box>
  );
}
