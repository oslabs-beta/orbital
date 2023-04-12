const express = require('express');
const metricsController = require('../controllers/metricsController.js');

const router = express.Router();

router.post('/metrics', metricsController.getCPUMetrics, (req, res) => {
  res.status(200).json(res.locals.metric);
});

module.exports = router;
