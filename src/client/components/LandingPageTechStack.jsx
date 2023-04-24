import { Box, Container, Grid, Typography } from "@mui/material";
import reactLogo from "../assets/react-logo.png";
import muiLogo from "../assets/mui-logo.jpg";
import chartjsLogo from "../assets/chartjs-logo.jpg";
import expressLogo from "../assets/express-logo.jpg";
import mongodbLogo from "../assets/mongodb-logo.jpg";
import prometheusLogo from "../assets/prometheus-logo.png";

const LoginTechStack = () => {
  return (
    <Box sx={{ bgcolor: "#082948", py: 8, color: "white", minHeight: "50vh", alignItems: "center", display: "flex" }} >
      <Container maxWidth="lg">
        <Typography variant="h3" component="h2" align="center" gutterBottom sx={{pb: '20px'}}>
          Our Tech Stack
        </Typography>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={6} sm={4} md={2}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img src={reactLogo} alt="React logo" style={{ height: "100px" }} />
            </Box>
              <Typography variant="h5" sx={{textAlign: "center", pt: "10px"}}>React</Typography>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img src={muiLogo} alt="Material UI logo" style={{ height: "100px" }} />
            </Box>
            <Typography variant="h5" sx={{textAlign: "center", pt: "10px"}}>Material UI</Typography>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img src={chartjsLogo} alt="ChartJS logo" style={{ height: "100px" }} />
            </Box>
            <Typography variant="h5" sx={{textAlign: "center", pt: "10px"}}>ChartJS</Typography>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img src={expressLogo} alt="Express logo" style={{ height: "100px" }} />
            </Box>
            <Typography variant="h5" sx={{textAlign: "center", pt: "10px"}}>Express</Typography>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img src={mongodbLogo} alt="MongoDB logo" style={{ height: "100px" }} />
            </Box>
            <Typography variant="h5" sx={{textAlign: "center", pt: "10px"}}>MongoDB</Typography>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img src={prometheusLogo} alt="Prometheus logo" style={{ height: "100px" }} />
            </Box>
            <Typography variant="h5" sx={{textAlign: "center", pt: "10px"}}>Prometheus</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LoginTechStack;