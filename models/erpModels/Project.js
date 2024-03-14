const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema({
  project_id: {
    type: Number,
    unique: true
  },
  removed: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  billing: {
    type: Number,
  },
  cost: {
    type: Number,
  },
  periods: {
    type: Object,
  },
  customer: {
    type: mongoose.Schema.ObjectId, ref: 'Client', autopopulate: true
  },
  employees: {
    type: Object,
  },
  costs: {
    type: Object,
  },
  ref: {
    type: String,
  },
  invoice_id: {
    type: String,
  },
  profitability: {
    type: Number,
  },
  project_details: {
    type: String,
  },
  status: {
    type: Number,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});
// const counterSchema = new Schema({
//   _id: { type: String, required: true },
//   seq: { type: Number, default: 0 }
// });
// const Counter = mongoose.model('Counter', counterSchema);

// const getNextSequenceValue = async function (sequenceName) {
//   const sequenceDocument = Project.findOneAndUpdate(
//     { _id: sequenceName },
//     { $inc: { sequence_value: 1 } },
//     { new: true }
//   );
//   return sequenceDocument.sequence_value;
// };

// projectSchema.pre('save', function (next) {

//   console.log(11111111111);
//   const doc = this;
//   Counter.findByIdAndUpdate({ _id: 'project_id' }, { $inc: { seq: 1 } }, { new: true, upsert: true })
//     .then(function (counter) {

//       console.log(doc, counter.seq);
//       doc.project_id = counter.seq;
//       next();
//     })
//     .catch(function (error) {
//       console.error(error);
//       throw error;
//     });
// });

module.exports = projectSchema
// module.exports = mongoose.model('Project', projectSchema);
