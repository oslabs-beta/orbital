const Cluster = require('../models/clusterModel.js');
const User = require('../models/userModel.js');

const clusterController = {
  async createCluster(req, res, next) {
    const { cluster_name, prom_port, owner } = req.body;
    try {
      const newCluster = await Cluster.create({
        name: cluster_name,
        prometheusUrl: prom_port,
        owner: owner,
      });
      res.locals.newcluster = newCluster;
      return next();
    } catch (error) {
      console.log(error);
    }
  },

  async saveClusterToUser(req, res, next) {
    const newCluster = res.locals.newcluster;
    try {
      const user = await User.findOneAndUpdate(
        { _id: newCluster.owner },
        { $push: { clusters: newCluster } },
        { new: true }
      );
      res.locals.savedcluster = user;
      return next();
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = clusterController;
