const { Schema, model } = require('mongoose');
const userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    userId: String,
    guildId: String,
    balance: { type: Number, default: 0 },
    attendance: { type: Date, default: new Date("01/01/2000 00:00") },
    league: { 
        id: {type: String, default: ""},
        summonerName: {type: String, default: ""}
    },
    cooldown: {
        chat: { type: Date, default: new Date("01/01/2000 00:00") },
        voice: { type: Date, default: new Date("01/01/2000 00:00") }
    },
    exp: {
        chat: { type: Number, default: 0 },
        voice: { type: Number, default: 0 },
        chatTotal: { type: Number, default: 0 },
        voiceTotal: { type: Number, default: 0 },
        chatLevel: { type: Number, default: 0 },
        voiceLevel: { type: Number, default: 0 }
    }


});

module.exports = model("User", userSchema, "users");