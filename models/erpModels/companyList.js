const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const companyList = new mongoose.Schema({
  company_name: {
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
  primary: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('companyList', companyList);
