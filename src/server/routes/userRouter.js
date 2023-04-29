const express = require("express");
const userController = require("../controllers/userController.js");

const router = express.Router();

// POST request to login endpoint to verify current user 
router.post("/login", userController.verifyUser, (req, res) => {
    res.json(res.locals.user);
});

// POST request to signup endpoint to create new user
router.post("/signup", userController.createUser, (req, res) => {
    res.json(res.locals.account_created);
});

// GET request to get user ID
router.get("/:id", userController.getUser, (req, res) => {
    res.json(res.locals.user);
});

module.exports = router;