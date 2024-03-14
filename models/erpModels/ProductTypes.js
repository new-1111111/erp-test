const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const ReferenceSchema = new mongoose.Schema({
  product_name: {
    type: String,
  },
  company_name: {
    type: mongoose.Schema.ObjectId,
    ref: 'companyList',
    autopopulate: true,
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
ReferenceSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('ProductTypes', ReferenceSchema);
