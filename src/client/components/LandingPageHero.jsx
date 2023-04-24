import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
// import earth from './assets/earth.jpg;'



const LandingPageHero = () => {
  return (
    <section style={{backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundColor: "#0D0818", paddingTop: "12px", paddingBottom: "12px", height: "80vh"}}>
        <Container maxWidth="md">
            <Box sx={{color: "white"}}>
                <Typography variant="h2" component="h2" gutterBottom>
                    Orbital
                </Typography>
            </Box>
            
        </Container>
    </section>
  )
}

export default LandingPageHero;