const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const visitControlSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  comments: {
    type: String,
  },
  inspection_comment: {
    type: String,
  },
  customer: {
    type: mongoose.Schema.ObjectId,
    ref: 'Client',
    required: true,
    autopopulate: true,
  },
  store: {
    type: mongoose.Schema.ObjectId,
    ref: 'CustomerStores',
    required: true,
    autopopulate: true,
  },
  by: {
    type: mongoose.Schema.ObjectId,
    ref: 'Admin',
    required: true,
    autopopulate: true,
  },
  visit_date: {
    type: String,
  },
  inspection_officer: {
    type: String,
  },
  customer_perception: {
    type: String,
  },
  person_acknowledging_receipt: {
    type: String,
  },
  inspection_details: {
    type: String
  },
  type: {
    type: Number,
  },
  status: {
    type: Number,
    default: 1
  },
  updated: {
    type: Date,
    default: Date.now,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = visitControlSchema
// module.exports = mongoose.model('VisitControl', visitControlSchema);
