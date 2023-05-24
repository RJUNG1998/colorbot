const { EmbedBuilder } = require('discord.js')
const User = require('../../schemas/user')

const BalanceIntervals = {};
const XPIntervals = {}
module.exports = {
    name: 'voiceStateUpdate',
    async execute(oldState, newState, client) {
        const AMOUNT = 15
        const connected = !!newState.channelId
        const userId = newState.id;

        if (connected) { //connected to voice channel
            //Database load
            //300000
            BalanceIntervals[userId] = setInterval(async () => {
                const storedUser = await client.fetchUser(
                    newState.id,
                    newState.guild.id
                );
                await User.findOneAndUpdate(
                    {
                        _id: storedUser._id,
                        balance: await storedUser.balance + AMOUNT
                    }
                )
            }, 300000)
            XPIntervals[userId] = setInterval(async () => {
                const storedUser = await client.fetchUser(
                    newState.id,
                    newState.guild.id
                );
                if (storedUser.exp.voice+1 >= client.expTable.get(storedUser.exp.voiceLevel)[0]) {
                    //TODO: output embed for congrat level up
                    await User.findOneAndUpdate(
                        { _id: storedUser._id },
                        {
                            'exp.voiceLevel': storedUser.exp.voiceLevel + 1,
                            'exp.voice': 0,
                            balance: storedUser.balance + client.expTable.get(storedUser.exp.voiceLevel)[0]
                        }
                    )
                }
                await User.findOneAndUpdate(
                    { _id: storedUser._id },
                    {
                        'exp.voice': storedUser.exp.voice + 1,
                        'exp.voiceTotal': storedUser.exp.voiceTotal + 1
                    }
                )
            }, 60000)
        } else { //disconnected to voice channel
            clearInterval(BalanceIntervals[userId])
            clearInterval(XPIntervals[userId])
        }
    }
}