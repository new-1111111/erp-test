const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const ReferenceSchema = new mongoose.Schema({
  routes: {
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
module.exports = ReferenceSchema
// module.exports = mongoose.model('Routes', ReferenceSchema);
