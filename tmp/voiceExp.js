const { EmbedBuilder } = require('discord.js')
const User = require('../../schemas/user')

const XPIntervals = {};
module.exports = {
    name: 'voiceStateUpdate',
    async execute(oldState, newState, client) {
        const connected = !!newState.channelId
        const userId = newState.id;

        if (connected) { //connected to voice channel
            // console.log("connected")

            //Database load
            const storedUser = await client.fetchUser(
                newState.id,
                newState.guild.id
            );

            XPIntervals[userId] = setInterval(async () => {
                const today = new Date();
                await User.findOneAndUpdate(
                    {
                        _id: storedUser._id,
                        balance: await storedUser.balance + 
                    }
                )
            }, 300000)
        } else { //disconnected to voice channel
            console.log("disconnected")
            clearInterval(XPIntervals[userId])
        }
    }
}