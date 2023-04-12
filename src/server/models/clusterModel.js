const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

// user should contain:

/*
Array of ports
Array of metrics
*/

const ClusterSchema = new Schema({
	name: { type: String, required: true },
	prometheusUrl: { type: String, required: true },
	owner: { type: Schema.Types.ObjectId, required: true, ref: "User" }
});

const Cluster = mongoose.model("Cluster", ClusterSchema);
module.exports = Cluster;
