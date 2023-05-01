const express = require('express');
const alertController = require('../controllers/alertController.js');

const router = express.Router();

router.post('/', alertController.createAlert, (req, res) => {
  res.sendStatus(200);
});

router.get('/:id', alertController.getUserAlerts, (req, res) => {
	res.json(res.locals.alerts);
})

router.delete('/:id', alertController.deleteAlert, (req, res) => {
	res.json(res.locals.deleted || "Hello");
})

module.exports = router;