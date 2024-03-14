const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const PaymentHistorySchema = new mongoose.Schema({
  reservation: [
    {
      reserva_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'CustomerReversations',
        autopopulate: true,
      },
      amount: {
        type: Number
      }
    }
  ],
  customer_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Client',
    autopopulate: true,
  },
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Admin',
    required: true,
    autopopulate: true,
  },

  payment_id: {
    type: Number,
    unique: true,
    require: true,
    default: 1
  },
  filename: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  removed: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  //checkout lists:::
  checkout: {
    type: Boolean,
    default: false,
  },
  method_id: {
    type: mongoose.Schema.ObjectId, ref: 'PaymentMethod', autopopulate: true
  },
  isTax: {
    type: Boolean,
    default: false,
  },
  order_price: {
    type: Number,
    default: 0.00,
  },
  tax_price: {
    type: Number,
    default: 0.00,
  },
  sub_total: {
    type: Number,
    default: 0.00,
  },
  orders: [{
    _id: {
      type: mongoose.Schema.ObjectId,
      ref: 'CheckoutProductLists',
      autopopulate: true,
    },
    count: {
      type: Number
    },

  }],
  status: {
    type: Number,
    default: 1,
  }
});
PaymentHistorySchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model(`PaymentHistory`, PaymentHistorySchema)
