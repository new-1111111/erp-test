const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const WorkContractSchema = new mongoose.Schema({
  start_date: {
    type: String,
  },
  end_date: {
    type: String,
  },
  terminated_date: {
    type: String,
  },
  sal_hr: {
    type: Number,
  },
  hr_week: {
    type: Number,
  },
  sal_monthly: {
    type: Number,
  },
  daily_hour: {
    type: Number,
  },
  status: {
    type: String,
    default: "active"
  },
  ref: {
    type: String,
  },
  type: {
    type: Number,
  },
  parent_id: {
    type: mongoose.Schema.ObjectId, ref: 'Employee', autopopulate: true,
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
// WorkContractSchema.plugin(require('mongoose-autopopulate'));
// WorkContractSchema.index({
//   name: 'text',
//   surname: 'text',
//   birthday: 'text',
//   status: 'text',
// });

module.exports = WorkContractSchema
// module.exports = mongoose.model('WorkContract', WorkContractSchema);
