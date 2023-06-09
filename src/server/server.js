const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter.js');
const kafkaRouter = require('./routes/kafkaRouter.js');
const metricsRouter = require('./routes/metricsRouter.js');
const clusterRouter = require('./routes/clusterRouter.js');
const alertRouter = require('./routes/alertRouter.js');

const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3001;

const URI =
  'mongodb+srv://cowboysintvland:mypassword11@cluster0.kniri3w.mongodb.net/test';

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', userRouter);
// app.use("/kafka", kafkaRouter);
app.use('/jmx', metricsRouter);
app.use('/cluster', clusterRouter);
app.use('/alerts', alertRouter);

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, '..', '..', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', '..', 'build', 'index.html'));
});

/* TESTING POST REQ ROUTE */
app.post('/test', (req, res) => {
  res.json(req.body);
});

// global err handler:
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong',
    error: err.message,
  });
});

//Unknown Route Handler
app.use((req, res) => res.sendStatus(404));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
