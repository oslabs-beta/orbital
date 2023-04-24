const express = require('express');
const alertController = require('../controllers/alertController.js');

const router = express.Router();

router.post('/', alertController.sendAlert, (req, res) => {
  res.json(res.locals.clusterArr);
});

module.exports = router;
