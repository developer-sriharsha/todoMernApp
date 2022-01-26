
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var counterSchema = new Schema({
    _id: { type: String, required: true },
    sequence_value: { type: Number, default: 1 }
});

var Counter = module.exports = mongoose.model('counters', counterSchema);

var getNextSequenceValue = {
    getNextSequenceValue: async function (sequenceName) {
        var sequenceDocument = await Counter.findOneAndUpdate(
            { _id: sequenceName },
            { $inc: { sequence_value: 1 } },
            { "new": true, upsert: true }
        );
        return sequenceDocument.sequence_value;
    }
}
module.exports = getNextSequenceValue;
