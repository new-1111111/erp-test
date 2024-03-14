const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


// module.exports = AssignedEmployeeSchema
// module.exports = mongoose.model('AssignedEmployee', AssignedEmployeeSchema);
// const init = (db_name) => {
// }
const AssignedEmployeeSchema = new mongoose.Schema({
  employee:
    { type: mongoose.Schema.ObjectId, ref: 'Employee', autopopulate: true },
  contract:
    { type: mongoose.Schema.ObjectId, ref: 'WorkContract', autopopulate: true },
  viaticum:
    { type: mongoose.Schema.ObjectId, ref: 'WorkContract', autopopulate: true },
  store:
    { type: mongoose.Schema.ObjectId, ref: 'CustomerStores', autopopulate: true },
  monday: {
    type: Object,
  },
  monday1: {
    type: Object,
  },
  tuesday: {
    type: Object,
  },
  tuesday1: {
    type: Object,
  },
  wednesday: {
    type: Object,
  },
  wednesday1: {
    type: Object,
  },
  thursday: {
    type: Object,
  },
  thursday1: {
    type: Object,
  },
  friday: {
    type: Object,
  },
  friday1: {
    type: Object,
  },
  saturday: {
    type: Object,
  },
  saturday1: {
    type: Object,
  },
  sunday: {
    type: Object,
  },
  sunday1: {
    type: Object,
  },
  sal_hr: {
    type: Number,
  },
  hr_week: {
    type: Number,
  },
  parent_id: {
    type: mongoose.Schema.ObjectId, ref: 'Client', autopopulate: true
  },
  position: {
    type: String,
  },
  gross_salary: {
    type: Number,
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
  start_date: {
    type: Date,
  },
  viaticum_start_date: {
    type: Date,
  },
  end_date: {
    type: Date,
  },
  viaticum_end_date: {
    type: Date,
  },
  unassigned: {
    type: Boolean,
  },
  every_hours: {
    type: Object
  },
  every_hours1: {
    type: Object
  },
  is_custom_monday: {
    type: Boolean
  },
  is_custom_tuesday: {
    type: Boolean
  }
  ,
  is_custom_wednesday: {
    type: Boolean
  }
  ,
  is_custom_thursday: {
    type: Boolean
  }
  ,
  is_custom_friday: {
    type: Boolean
  }
  ,
  is_custom_saturday: {
    type: Boolean
  }
  ,
  is_custom_sunday: {
    type: Boolean
  }
});

// AssignedEmployeeSchema.plugin(require('mongoose-autopopulate'));
module.exports = AssignedEmployeeSchema;
// module.exports = {
//   init
// }