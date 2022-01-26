const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    userId: { type: Number, required: true },
    todoTitle: { type: String, required: true },
    todoDescription: { type: String },
    todoPriority: { type: Number, required: true, default: 1 },
    todoStatus: { type: Number, default: 1 }, // 1= open/active 0=completed/closed
    status: { type: Number, default: 1 }, // 1= active 0=deleted
    createdDate: { type: Date, default: () => Date.now() },
    modifiedDate: { type: Date },
    createdUserId: { type: Number },
    modifiedUserId: { type: Number }
});

module.exports = mongoose.model('userTodos', todoSchema, "userTodos");


