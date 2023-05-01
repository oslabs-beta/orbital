const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClusterSchema = new Schema(
    {
        name: { type: String, required: true },
        prometheusUrl: { type: String, required: true },
        owner: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    },
    { collection: "clusters" }
);

const Cluster = mongoose.model("Cluster", ClusterSchema);
module.exports = Cluster;
