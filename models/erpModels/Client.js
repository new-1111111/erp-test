const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const clientSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  company_id: {
    type: String,
    trim: true,
    // required: true,
  },
  customer_id: {
    type: Number,
    unique: true,
    require: true,
    default: 1
  },
  name: {
    type: String,
    trim: true,
    // required: true,
  },
  iguser: {
    type: String,
    trim: true,
    // required: true,
  },
  managerName: {
    type: String,
    trim: true,
    // required: true,
  },
  managerSurname: {
    type: String,
    trim: true,
    // required: true,
  },
  bankAccount: {
    type: String,
    trim: true,
  },
  companyRegNumber: {
    type: String,
    trim: true,
  },
  companyTaxNumber: {
    type: String,
    trim: true,
  },
  companyTaxID: {
    type: String,
    trim: true,
  },
  customField: [
    {
      fieldName: {
        type: String,
        trim: true,
      },
      fieldValue: {
        type: String,
        trim: true,
      },
    },
  ],
  address: {
    type: String,
    trim: true,
  },
  avatar: {
    type: String,
    trim: true,
  },
  country: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
    required: true,
  },
  fax: {
    type: String,
    trim: true,
  },
  cell: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  website: {
    type: String,
    trim: true,
  },
  status: {
    type: Number,
    default: 1,
  },
  legal_name: {
    type: String,
  },
  notes: {
    type: String,
  },
  ruc: {
    type: String,
  },
  tax_residence: {
    type: String,
  },
  billing_details: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

clientSchema.pre('save', async function (next) {
  const Client = mongoose.model('Client');
  const [result] = await Client.aggregate([
    { $group: { _id: null, latestId: { $max: "$customer_id" } } }
  ]);
  if (result) {
    this.customer_id = result?.latestId + 1;
  }
  next();
});
module.exports = mongoose.model('Client', clientSchema);