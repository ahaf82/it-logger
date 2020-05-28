const mongoose = require('mongoose');

const LogsSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'logs'
    },
    message: {
        type: String,
        required: true
    },
    tech: {
        type: String,
        required: true
    },
    attention: {
        type: Boolean
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('logs', LogsSchema);
