const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255,
    },
    description: {
        type: String,
        required: true,
        min: 6,
        max: 1024,
    },
    status: {
        type: Boolean,
        default: false,
    },
    creationDate: {
        type: Date,
        default: Date.now,
    },
    completionDate: {
        type: Date,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
    },
});

module.exports = mongoose.model('Task', taskSchema);
