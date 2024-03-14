const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const ReservationsSchema = new mongoose.Schema({
  parent_id: {
    type: String,
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
    require: true
  },
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Admin',
    required: true,
    autopopulate: true,
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
ReservationsSchema.pre('save', async function (next) {
  const Reservations = mongoose.model('Reservations');
  const [result] = await Reservations.aggregate([
    { $group: { _id: null, latestId: { $max: "$reserva_id" } } }
  ]);
  if (result) {
    this.reserva_id = result?.latestId + 1;
  } else {
    this.reserva_id = 1;
  }
  next()
});
ReservationsSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Reservations', ReservationsSchema);
