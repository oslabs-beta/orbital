const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlertSchema = new Schema(
  {
    metric: { type: String, required: true },
    over: { type: Number, required: true },
    under: { type: Number, required: true },
    owner: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  { collection: 'alerts' }
);

const Alert = mongoose.model('Alert', AlertSchema);
module.exports = Alert;
