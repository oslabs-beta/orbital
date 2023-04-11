const express = require("express");
const KafkaController = require("../controllers/kafkaController.js");

const router = express.Router();

router.post('/metrics', KafkaController.getMetrics, (req, res) => {
	res.status(200).json(res.locals.metrics);
})







module.exports = router;