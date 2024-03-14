const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const systemInfoSchema = new mongoose.Schema({
    tax_percent: {
        type: Number,
        default: 0.00
    },
    removed: {
        type: Boolean,
        default: false,
    },
    enabled: {
        type: Boolean,
        default: true,
    },
    smtp_host: {
        type: String,
    },
    smtp_port: {
        type: Number,
    },
    smtp_user: {
        type: String,
    },
    smtp_pass: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model('SystemInfo', systemInfoSchema);


