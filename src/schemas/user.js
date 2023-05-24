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
    }
});

module.exports = model("User", userSchema, "users");