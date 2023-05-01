import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useState } from 'react';
import { Button } from '@mui/material';
import LogoutButton from '../components/LogoutButton';
import ClusterDynamicDetails from '../components/ClusterDynamicDetails';
import { useNavigate } from 'react-router-dom';
import orbitalLogo from '../assets/transparent-orbital.png';
import HeartIcon from '@mui/icons-material/Favorite';
import TopicIcon from '@mui/icons-material/Article';
import OverviewIcon from '@mui/icons-material/TravelExplore';

const drawerWidth = 100;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    // flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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

  backgroundColor: '#000000',
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: '#000000',
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  backgroundColor: '#444444',
}));

export default function PersistentDrawerLeft({ user }) {
  const [open, setOpen] = useState(true);
  const [intervalId, setIntervalId] = useState(null);
  const [metrics, setMetrics] = useState(0);
  const [currentTab, setCurrentTab] = useState('overview');
  const navigate = useNavigate();

  // Get array of clusters based on userID

  return (
    <Box
      sx={{
        display: 'flex',
        boxSizing: 'border-box',
        fontWeight: 'bold',
      }}
    >
      <CssBaseline />
      <AppBar position='fixed' open={open} sx={{ backgroundColor: 'black' }}>
        <Toolbar sx={{ borderBottom: '1px solid white' }}>
          <Typography
            sx={{ width: '100vw', textAlign: 'center', ml: '15vw' }}
            variant='h6'
            noWrap
            component='div'
          >
            {currentTab[0].toUpperCase() + currentTab.slice(1)}
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
            backgroundColor: 'black',
            borderBottom: '1px solid white',
          }}
        >
          <Button
            color='secondary'
            sx={{ fontWeight: 'bold', fontSize: 18 }}
            onClick={() => navigate('/home')}
          >
            Home
          </Button>
          <img
            src={orbitalLogo}
            alt='Orbital logo'
            style={{
              maxWidth: '65px',
              maxHeight: '65px',
              marginLeft: '30px',
              marginTop: '5px',
            }}
          />
          <Typography
            variant='h6'
            noWrap
            component='div'
            textAlign='center'
            color='white'
            fontWeight='bold'
            marginRight='70px'
          >
            {'Orbital'}
          </Typography>
        </DrawerHeader>
        <Divider sx={{ backgroundColor: 'black' }} />

        <List
          sx={{
            backgroundColor: 'black',
            p: 3,
            height: '100vh',
            minWidth: '300px',
          }}
        >
          <ListItem
            disablePadding
            sx={{
              color: 'white',
            }}
          >
            <ListItemButton
              sx={{
                borderRadius: '8px',
                border: '1px solid black',
                backgroundColor: 'rgb(24, 45, 91)',
                '&:hover': { backgroundColor: 'rgb(48, 90, 182)' },
              }}
              onClick={() => setCurrentTab('overview')}
            >
              <OverviewIcon color='secondary' />
              <ListItemIcon></ListItemIcon>
              <Typography
                variant='h6'
                component='div'
                color='white'
                fontWeight={500}
              >
                Overview
              </Typography>
            </ListItemButton>
          </ListItem>
          <Divider sx={{ borderColor: 'black', borderWidth: '5px' }} />
          <ListItem
            disablePadding
            sx={{
              color: 'white',
            }}
          >
            <ListItemButton
              sx={{
                borderRadius: '8px',
                border: '1px solid black',
                backgroundColor: 'rgb(24, 45, 91)',
                '&:hover': { backgroundColor: 'rgb(48, 90, 182)' },
              }}
              onClick={() => setCurrentTab('health')}
            >
              <HeartIcon color='secondary' />
              <ListItemIcon></ListItemIcon>
              <Typography
                variant='h6'
                component='div'
                color='white'
                fontWeight={500}
              >
                Health Metrics
              </Typography>
            </ListItemButton>
          </ListItem>
          <Divider sx={{ borderColor: 'black', borderWidth: '5px' }} />
          <ListItem
            disablePadding
            sx={{
              color: 'white',
            }}
          >
            <ListItemButton
              sx={{
                borderRadius: '8px',
                border: '1px solid black',
                backgroundColor: 'rgb(24, 45, 91)',
                '&:hover': { backgroundColor: 'rgb(48, 90, 182)' },
              }}
              onClick={() => setCurrentTab('topic')}
            >
              <TopicIcon color='secondary' />
              <ListItemIcon></ListItemIcon>
              <Typography
                variant='h6'
                component='div'
                color='white'
                fontWeight={500}
              >
                Topic Metrics
              </Typography>
            </ListItemButton>
          </ListItem>
          <LogoutButton />
        </List>
      </Drawer>

      <Main
        open={open}
        sx={{
          backgroundColor: 'rgb(24, 45, 91)',
          ml: 6,
          width: '100%',
        }}
      >
        <ClusterDynamicDetails
          currentTab={currentTab}
          setMetrics={setMetrics}
          setIntervalId={setIntervalId}
        />
      </Main>
    </Box>
  );
}
