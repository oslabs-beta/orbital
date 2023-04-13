const express = require('express');
const clusterController = require('../controllers/clusterController.js');

const router = express.Router();

router.post(
  '/',
  clusterController.createCluster,
  clusterController.saveClusterToUser,
  (req, res) => {
    res.status(200).json(res.locals.savedcluster);
  }
);

module.exports = router;
