import React from 'react';
import { Box, Typography, Button, Container, Card, CardMedia } from '@mui/material';
import { Grid } from '@mui/material';
import Logo from '../assets/Logo.png';
import {useNavigate} from 'react-router-dom';
import Space from '../assets/Space.jpg';






const LandingPageHero = () => {
    const navigate = useNavigate()
    
    
    return (
      <Box
        sx={{
          backgroundImage: `url(${Space})`,
          backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        
          color: "white",
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          px: { xs: 2, md: 0 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={2} alignItems="center" sx={{ flexDirection: { xs: "column-reverse", md: "row" } }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h2" gutterBottom>
                Orbital
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                The ultimate solution for monitoring Apache Kafka clusters. Get real-time insights and alerts on key metrics to optimize performance and troubleshoot issues quickly.
              </Typography>
              <Box sx={{ mt: { xs: 2, md: 4 } }}>
                <Button variant="contained" color="secondary" onClick={() => navigate('/login')} >
                  Get started
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Box sx={{ maxWidth: "100%", maxHeight: "100%" }}>
              <img src={Logo} alt="Orbital logo" style={{ height: "auto", maxWidth: "100%", objectFit: "contain" }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  };
  
  export default LandingPageHero;