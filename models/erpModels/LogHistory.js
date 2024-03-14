const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const logHistorySchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
  },
  user_id: {
    type: mongoose.Schema.ObjectId, ref: 'Admin', autopopulate: true
  },
  log_id: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  where_: {
    type: String,
  }
});
logHistorySchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('LogHistory', logHistorySchema);
