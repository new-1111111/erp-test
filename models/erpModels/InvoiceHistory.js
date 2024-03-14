const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const InvoiceHistorySchema = new mongoose.Schema({
  recurrent_id:
    { type: mongoose.Schema.ObjectId, ref: 'RecurrentInvoice', autopopulate: true },
  parent_id:
    { type: mongoose.Schema.ObjectId, ref: 'Client', autopopulate: true },

  start_date: {
    type: Date,
  },
  amount: {
    type: Number,
  },
  details: {
    type: String,
  },
  removed: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});
module.exports = InvoiceHistorySchema
// module.exports = mongoose.model('InvoiceHistory', InvoiceHistorySchema);
