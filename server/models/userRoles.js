const mongoose = require('mongoose');

const userRolesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: Number, required: true },
    userRoleType: { type: Number, require: true }
});


module.exports = mongoose.model('userRoles', userRolesSchema, "userRoles");

