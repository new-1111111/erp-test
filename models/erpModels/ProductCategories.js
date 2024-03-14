const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const ProductCategories = new mongoose.Schema({
  category_name: {
    type: String,
  },
  product_price: {
    type: String,
  },
  product_type: {
    type: mongoose.Schema.ObjectId, ref: 'ProductTypes', autopopulate: true,
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
ProductCategories.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('ProductCategories', ProductCategories);
