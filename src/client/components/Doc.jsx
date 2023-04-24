import { Box, Container, Grid, Paper, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";

const Doc = () => {
  return (
    <Box sx={{ bgcolor: "white", py: 8 }}>
      <Container maxWidth="md">
        <Typography variant="h4" component="h2" align="center" sx={{pb: "20px", pt: "20px"}}>
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
          <Divider sx={{ width: '80%', margin: 'auto', marginTop: 4, marginBottom: 4 }} />




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
          <Divider sx={{ width: '80%', margin: 'auto', marginTop: 4, marginBottom: 4 }} />




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
    <Divider sx={{  margin: 'auto', marginTop: 4, marginBottom: 4, border: '1px solid #333' }} />
 
    <Typography variant="h4" component="h2" align="center" sx={{ pb: "20px" }}>
  Kafka Router
</Typography>
<Grid container spacing={4}>
  <Grid item xs={12} sm={6}>
    <Box sx={{ py: 2 }}>
      <Typography variant="h5" component="h3">
        /kafka/:id
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Get clusters associated with a user ID.
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Required Fields:
      </Typography>

      <List>
        <ListItem>
          <ListItemText primary="Id" />
        </ListItem>
      </List>
    </Box>
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
            [
                {
                    "id": 1,
                    "name": "cluster1",
                    "user_id": 123
                  },
                  {
                    "id": 2,
                    "name": "cluster2",
                    "user_id": 123
                  }
            ]`}
              </pre>
        </Paper>
  </Grid>
  
  <Divider sx={{ width: '80%', margin: 'auto', marginTop: 4, marginBottom: 4 }} />

  <Grid item xs={12} sm={6}>
    <Box sx={{ py: 2 }}>
      <Typography variant="h5" component="h3">
        /kafka/clusterById/:id
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Get cluster information by ID.
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Required Fields:
      </Typography>

      <List>
        <ListItem>
          <ListItemText primary="Id" />
        </ListItem>
      </List>
    </Box>
  </Grid>
  
  <Grid item xs={12} sm={6}>
    <Paper sx={{ bgcolor: "#1E1E1E", color: "#FFF", p: 2, borderRadius: 1 }}>
      <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
        {`Request
            {
                "id": 1
            }`}
      </pre>
      <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
        {`Response
{
  "id": 1,
  "name": "cluster1",
  "created_at": "2022-05-02T15:44:59.000Z",
  "user_id": 123
}`}
      </pre>
    </Paper>
  </Grid>
  </Grid>

  <Divider sx={{  margin: 'auto', marginTop: 4, marginBottom: 4, border: '1px solid #333' }} />

  <Typography variant="h4" component="h2" align="center" sx={{ pb: "20px" }}>
  Metrics Router
</Typography>
<Grid container spacing={4}>
  <Grid item xs={12} sm={6}>
    <Box sx={{ py: 2 }}>
      <Typography variant="h5" component="h3">
        /metrics
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Get cluster overview metrics associated with a Prometheus port.
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Required Fields:
      </Typography>

      <List>
        <ListItem>
          <ListItemText primary="Broker port" />
        </ListItem>
      </List>
    </Box>
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
            [
                {
                    "id": 1,
                    "name": "cluster1",
                    "user_id": 123
                  },
                  {
                    "id": 2,
                    "name": "cluster2",
                    "user_id": 123
                  }
            ]`}
              </pre>
        </Paper>
  </Grid>
  
  <Divider sx={{ width: '80%', margin: 'auto', marginTop: 4, marginBottom: 4 }} />

  <Grid item xs={12} sm={6}>
    <Box sx={{ py: 2 }}>
      <Typography variant="h5" component="h3">
        /metrics/broker
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Get cluster metrics information by ID.
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Required Fields:
      </Typography>

      <List>
        <ListItem>
          <ListItemText primary="Id" />
        </ListItem>
      </List>
    </Box>
  </Grid>
  
  <Grid item xs={12} sm={6}>
    <Paper sx={{ bgcolor: "#1E1E1E", color: "#FFF", p: 2, borderRadius: 1 }}>
      <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
        {`Request
            {
                "id": 1
            }`}
      </pre>
      <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
        {`Response
          {
            "id": 1,
            "name": "cluster1",
            "created_at": "2022-05-02T15:44:59.000Z",
            "user_id": 123
          }`}
      </pre>
    </Paper>
  </Grid>
  </Grid>

  <Divider sx={{  margin: 'auto', marginTop: 4, marginBottom: 4, border: '1px solid #333' }} />

  <Typography variant="h4" component="h2" align="center" sx={{ pb: "20px" }}>
  Cluster Router
</Typography>
<Grid container spacing={4}>
  <Grid item xs={12} sm={6}>
    <Box sx={{ py: 2 }}>
      <Typography variant="h5" component="h3">
        /cluster
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Get cluster overview metrics associated with a Prometheus port.
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Required Fields:
      </Typography>

      <List>
        <ListItem>
          <ListItemText primary="Broker port" />
        </ListItem>
      </List>
    </Box>
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
            [
                {
                    "id": 1,
                    "name": "cluster1",
                    "user_id": 123
                  },
                  {
                    "id": 2,
                    "name": "cluster2",
                    "user_id": 123
                  }
            ]`}
              </pre>
        </Paper>
  </Grid>
  
  <Divider sx={{ width: '80%', margin: 'auto', marginTop: 4, marginBottom: 4 }} />

  <Grid item xs={12} sm={6}>
    <Box sx={{ py: 2 }}>
      <Typography variant="h5" component="h3">
        /metrics/broker
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Get cluster metrics information by ID.
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Required Fields:
      </Typography>

      <List>
        <ListItem>
          <ListItemText primary="Id" />
        </ListItem>
      </List>
    </Box>
  </Grid>
  
  <Grid item xs={12} sm={6}>
    <Paper sx={{ bgcolor: "#1E1E1E", color: "#FFF", p: 2, borderRadius: 1 }}>
      <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
        {`Request
            {
                "id": 1
            }`}
      </pre>
      <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
        {`Response
          {
            "id": 1,
            "name": "cluster1",
            "created_at": "2022-05-02T15:44:59.000Z",
            "user_id": 123
          }`}
      </pre>
    </Paper>
  </Grid>
  </Grid>

</Container>
</Box>
  )}

export default Doc;