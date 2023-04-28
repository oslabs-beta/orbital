const express = require('express');
const metricsController = require('../controllers/metricsController.js');
const alertController = require('../controllers/alertController.js');
const router = express.Router();

router.post('/metrics', metricsController.getCPUMetrics, (req, res) => {
  res.status(200).json(res.locals.metric);
});

router.post('/topics', metricsController.getAllTopics, (req, res) => {
  res.status(200).json(res.locals.topics);
});

router.post('/topicMetrics', metricsController.getTopicMetrics, (req, res) => {
  res.status(200).json(res.locals.metric);
});

router.post(
  '/producerConsumerMetrics',
  metricsController.getProducerConsumerMetrics,
  (req, res) => {
    res.status(200).json(res.locals.metric);
  }
);

router.post(
  '/fakeMetricsEndpoint',
  metricsController.getFakeMetrics,
	alertController.checkRanges,
  (req, res) => {
    res.status(200).json(res.locals.metric);
  }
);

module.exports = router;
