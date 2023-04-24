import { Box, Container, Grid, Paper, Typography, List, ListItem, ListItemText } from "@mui/material";

const Doc = () => {
  return (
    <Box sx={{ bgcolor: "white", py: 8 }}>
      <Container maxWidth="md">
        <Typography variant="h4" component="h2" align="center" sx={{pb: "20px"}}>
          User Routes
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
          <Box sx={{ py: 2 }}>
      <Typography variant="h5" component="h3">
        /user/login
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Logs user in.
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Required Fields:
      </Typography>
     
      <List>
        <ListItem>
          <ListItemText primary="Email" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Password" />
        </ListItem>
      </List>
    
    </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
          <Paper sx={{ bgcolor: "#1E1E1E", color: "#FFF", p: 2, borderRadius: 1 }}>
              <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
            {`Request
            {
              "email": "johndoe@example.com",
              "password": "password123",
            }
            `}
              </pre>
              <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
            {`Response
            {
              "id":123,
              "email": "johndoe@example.com,
              "name": "John Doe"
              "token": "token123"
            }`}
              </pre>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ py: 2 }}>
              <Typography variant="h5" component="h3">
                /user/signup
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Create a new user account.
              </Typography>
            </Box>
            <List>
        <ListItem>
          <ListItemText primary="Email" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Password" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Name" />
        </ListItem>
      </List>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ bgcolor: "#1E1E1E", color: "#FFF", p: 2, borderRadius: 1 }}>
              <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
                {`Request
            {
              "email": "johndoe@example.com",
              "password": "password123",
              "name": "John Doe"
            }`}
              </pre>
              <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
                {`Response
            {
              "success": true,
            }`}
              </pre>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ py: 2 }}>
              <Typography variant="h5" component="h3">
                /user/:id
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Get user information by ID.
              </Typography>
            </Box>
            <List>
        <ListItem>
          <ListItemText primary="Id" />
        </ListItem>
      </List>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ bgcolor: "#1E1E1E", color: "#FFF", p: 2, borderRadius: 1 }}>
          <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
                {`Request
            {
              "id": 123,
            }`}
              </pre>
              <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
                {`Response
            {
              "id": 123,
              "email": "johndoe@example.com",
              "name": "John Doe"
            }`}
              </pre>
        </Paper>
        
      </Grid>
      
    </Grid>
  </Container>
</Box>
  )}

export default Doc;