const express = require('express');
const userController = require('../controllers/userController.js')

const router = express.Router();


router.post('/login', userController.verifyUser, (req, res) => {
	res.status(200).json(res.locals.status)
});


router.post('/signup', userController.createUser, (req, res) => {
	res.sendStatus(200)
});

module.exports = router;