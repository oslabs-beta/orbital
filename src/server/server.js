const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter.js');
const kafkaRouter = require('./routes/kafkaRouter.js');
const metricsRouter = require('./routes/metricsRouter.js');
const clusterRouter = require('./routes/clusterRouter.js');

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
app.use('/kafka', kafkaRouter);
app.use('/jmx', metricsRouter);
app.use('/cluster', clusterRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

//Unknown Route Handler
app.use((req, res) => res.sendStatus(404));

module.exports = app;
