import { Box, Container, Grid, Typography } from "@mui/material";
import reactLogo from "../assets/react-logo.png";
import muiLogo from "../assets/mui-logo.png";
import chartjsLogo from "../assets/chartjs-logo.png";
import expressLogo from "../assets/express-logo.png";
import mongodbLogo from "../assets/mongodb-logo.png";
import prometheusLogo from "../assets/prometheus-logo.png";

const TechStackSection = () => {
  return (
    <Box sx={{ bgcolor: "white", py: 8 }}>
      <Container maxWidth="md">
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Our Tech Stack
        </Typography>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={6} sm={4} md={2}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img src={reactLogo} alt="React logo" style={{ height: "60px" }} />
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img src={muiLogo} alt="Material UI logo" style={{ height: "60px" }} />
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img src={chartjsLogo} alt="ChartJS logo" style={{ height: "60px" }} />
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img src={expressLogo} alt="Express logo" style={{ height: "60px" }} />
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img src={mongodbLogo} alt="MongoDB logo" style={{ height: "60px" }} />
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img src={prometheusLogo} alt="Prometheus logo" style={{ height: "60px" }} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default TechStackSection;