const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const PayrollSchema = new mongoose.Schema({
  comment: {
    type: String,
  },
  date: {
    type: String,
  },
  hour: {
    type: Number,
  },
  contract: {
    type: String,
  },
  by: {
    type: mongoose.Schema.ObjectId, ref: 'Admin', autopopulate: true
  },
  customer: {
    type: String,
  },
  employee: {
    type: String,
  },
  history: {
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
  position: {
    type: String
  }
});
module.exports = PayrollSchema
// module.exports = mongoose.model('Payroll', PayrollSchema);
