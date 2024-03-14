const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const CustomerReversationsSchema = new mongoose.Schema({
  parent_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Client',
    required: true,
    autopopulate: true,
  },
  product_name: {
    type: mongoose.Schema.ObjectId,
    ref: 'ProductCategories',
    required: true,
    autopopulate: true,
  },
  product_type: {
    type: mongoose.Schema.ObjectId,
    ref: 'ProductTypes',
    required: true,
    autopopulate: true,
  },
  reserva_id: {
    type: Number,
    unique: true,
    require: true,
    default: 1
  },
  company_name: {
    type: mongoose.Schema.ObjectId,
    ref: 'companyList',
    required: true,
    autopopulate: true,
  },
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Admin',
    required: true,
    autopopulate: true,
  },
  filename: {
    type: String,
  },
  product_price: {
    type: String,
  },
  is_preventa: {
    type: Boolean,
  },
  notes: {
    type: String,
  },
  paid_amount: {
    type: String,
  },
  total_amount: {
    type: String,
  },
  prediente: {
    type: String,
  },
  product_url: {
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
  status: {
    type: Number,
    default: 1
  },
  payment_status: {
    type: Number,
    default: 1
  },
});
CustomerReversationsSchema.plugin(require('mongoose-autopopulate'));
// CustomerReversationsSchema.pre('save', async function (next) {
//   const CustomerReversations = mongoose.model('CustomerReversations');
//   const [result] = await CustomerReversations.find().sort({ salary: 1 }).limit(1);
//   console.log(result, `'result`)
//   if (result) {
//     this.reserva_id = result?.latestId + 1;
//   }

//   next()
// });

module.exports = mongoose.model('CustomerReversations', CustomerReversationsSchema);
