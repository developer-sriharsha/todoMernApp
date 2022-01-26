const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const userLogsSchema = mongoose.Schema({
    userId: { type: Number, required: true },
    todoId: { type: ObjectId, required: true },
    action: { type: String, required: true },
    status: { type: Number, default: 1 },
    dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('userLogs', userLogsSchema, "usersLogs");