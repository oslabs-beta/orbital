const express = require('express');
const metricsController = require('../controllers/metricsController.js');
const router = express.Router();

// POST request metrics endpoint to
router.post('/metrics', metricsController.getCoreMetrics, (req, res) => {
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

module.exports = router;
