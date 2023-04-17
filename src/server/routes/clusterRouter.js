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
router.patch('/', clusterController.updateCluster, (req, res) => {
  res.status(200).json(res.locals.cluster);
});
router.delete('/', clusterController.deleteCluster, (req, res) => {
  res.status(200).json(res.locals.deletedCluster);
});
module.exports = router;
