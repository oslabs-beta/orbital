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
  async updateCluster(req, res, next) {
    const { cluster_id, cluster_name, prom_port, owner } = req.body;
    try {
      const cluster = await Cluster.findOneAndUpdate(
        { _id: cluster_id },
        { name: cluster_name, prometheusUrl: prom_port, owner: owner },
        { new: true }
      );
      res.locals.cluster = cluster;
      return next();
    } catch (error) {
      console.log(error);
    }
  },
  async deleteCluster(req, res, next) {
    const { cluster_id } = req.params;
    try {
      const deletedCluster = await Cluster.findByIdAndDelete(cluster_id);
      if (!deletedCluster) {
        return res.status(404).send({ message: 'Cluster not found' });
      }
      res.locals.deletedCluster = deletedCluster;
      return next();
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = clusterController;
