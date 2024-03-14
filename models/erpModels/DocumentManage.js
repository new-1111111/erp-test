const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const DocumentManageSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  parent_id: {
    type: mongoose.Schema.ObjectId, ref: 'Client', autopopulate: true
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  filename: {
    type: String,
    trim: true,
    // required: true,
  },

  comments: {
    type: String,
    trim: true,
    // required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});
// DocumentManageSchema.plugin(require('mongoose-autopopulate'));
module.exports = DocumentManageSchema;
// module.exports = mongoose.model('DocumentManage', DocumentManageSchema);
