const Cluster = require("../models/clusterModel.js");
const User = require("../models/userModel.js");
const { ObjectId } = require("mongoose");
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
        try {
            const { cluster_id, cluster_name, prom_port } = req.body;
            console.log(
                `Cluster ID: ${cluster_id}\nCluster Name: ${cluster_name}\nProm Port: ${prom_port}`
            );
            const cluster = await Cluster.findOneAndUpdate(
                { _id: cluster_id },
                { name: cluster_name, prometheusUrl: prom_port },
                { new: true }
            );
            console.log(cluster);
            res.locals.cluster = cluster;
            return next();
        } catch (error) {
            console.log(error);
        }
    },
    async deleteCluster(req, res, next) {
        try {
            const id = req.params.id;
            const deletedCluster = await Cluster.findByIdAndDelete(id);
            if (!deletedCluster) {
                return res.status(404).send({ message: "Cluster not found" });
            }
            res.locals.deletedCluster = deletedCluster;
            return next();
        } catch (error) {
            err.message =
                "Error in clusterController.deleteCluster middleware.";
            return next(err);
        }
    },
    async getUserClusters(req, res, next) {
        try {
            const id = req.params.id;
            const clusterArr = await Cluster.find({ owner: id });
            res.locals.clusterArr = clusterArr;
            return next();
        } catch (err) {
            err.message =
                "Error in ClusterController.getUserClusters middleware.";
            return next(err);
        }
    },
    async getClusterById(req, res, next) {
        try {
            const id = req.params.id;
            res.locals.cluster = await Cluster.findOne({ _id: id });
            return next();
        } catch (err) {
            err.message =
                "Error in ClusterController.getClusterById middleware.";
            return next(err);
        }
    },
};

module.exports = clusterController;
