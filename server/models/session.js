const mongoose = require('mongoose');

const userSessionsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    token: { type: String, required: true },
    userId: { type: Number, required: true },
    expiration: { type: Date, required: true },
    status: { type: Number, default: 1 },
});


module.exports = mongoose.model('userSessions', userSessionsSchema,"userSessions");

