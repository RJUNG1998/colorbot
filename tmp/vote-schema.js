const { Schema, model } = require('mongoose');

const voteSchema = new Schema({
    _id: Schema.Types.ObjectId,
    userId: String,
    executedate: { type: String, default: "" }
});

module.exports = model("Vote", voteSchema, "votes");