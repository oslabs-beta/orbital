const express = require('express');
const clusterController = require('../controllers/clusterController.js');

const router = express.Router();

router.get('/:id', clusterController.getUserClusters, (req, res) => {
  res.json(res.locals.clusterArr);
});


router.get('/clusterById/:id', clusterController.getClusterById, (req, res) => {
  res.json(res.locals.cluster);
});

router.post('/', clusterController.createCluster, (req, res) => {
  res.status(200).json(res.locals.savedcluster);
});
router.patch('/', clusterController.updateCluster, (req, res) => {
  res.status(200).json(res.locals.cluster);
});
router.delete('/:id', clusterController.deleteCluster, (req, res) => {
  res.status(200).json(res.locals.deletedCluster);
});

module.exports = router;
