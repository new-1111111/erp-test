const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const paymentMethodSchema = new mongoose.Schema({
  method_name: {
    type: String,
  },
  method_description: {
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
module.exports = mongoose.model('PaymentMethod', paymentMethodSchema);
