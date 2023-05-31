const { Schema, model } = require('mongoose');
const guildSchema = new Schema({
    _id: Schema.Types.ObjectId,
    guildId: String,
    guildName: String,
    guildIcon: { type: String, default: 'guildlogo_1' },
    exp: { type: Number, default: 0 },
    memberLimit: { type: Number, default: 5 },
    memberList: [String],
    balance: { type: Number, default: 0 },
    owner: String,
    
});

module.exports = model("Guild", guildSchema, "guilds");