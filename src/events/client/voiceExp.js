const { EmbedBuilder } = require('discord.js')
const User = require('../../schemas/user')

const BalanceIntervals = new Map();
const XPIntervals = new Map();
module.exports = {
    name: 'voiceStateUpdate',
    async execute(oldState, newState, client) {
        const AMOUNT = 15
        const userId = newState.id;
        //입장문
        if (newState.channel && !oldState.channel) {
            await client.fetchUser(
                newState.id,
                newState.guild.id
            );
            if (!BalanceIntervals.has(userId)) {
                BalanceIntervals.set(userId, setInterval(async () => {
                    const storedUser = await client.fetchUser(
                        newState.id,
                        newState.guild.id
                    );
                    await User.findOneAndUpdate(
                        { _id: storedUser._id },
                        { balance: await storedUser.balance + AMOUNT }
                    )
                }, 300000))
            }
            if (!XPIntervals.has(userId)) {
                XPIntervals.set(userId, setInterval(async () => {
                    const storedUser = await client.fetchUser(
                        newState.id,
                        newState.guild.id
                    );
                    if (storedUser.exp.voice+2 >= client.expTable.get(storedUser.exp.voiceLevel)[0]) {
                        if (storedUser.exp.role !== client.expTable.get(storedUser.exp.voiceLevel + 1)[2]) {
                            await newState.guild.members.cache.get(newState.id).roles.remove(client.heartTable.get(storedUser.exp.role));
                            await newState.guild.members.cache.get(newState.id).roles.add(client.heartTable.get(client.expTable.get(storedUser.exp.voiceLevel + 1)[2]));
                            const backgroundArray = storedUser.profileSource.backgroundInventory;
                            if (!backgroundArray.includes(`${client.expTable.get(storedUser.exp.voiceLevel + 1)[2]}`)) {
                                backgroundArray.push(`${client.expTable.get(storedUser.exp.voiceLevel + 1)[2]}`);
                            }
                        }


                        await User.findOneAndUpdate(
                            { _id: storedUser._id },
                            {
                                'exp.voiceLevel': storedUser.exp.voiceLevel + 1,
                                'exp.voice': 2,
                                'exp.voiceTotal': storedUser.exp.voiceTotal + 2,
                                'exp.role': client.expTable.get(storedUser.exp.voiceLevel + 1)[2],
                                'profileSource.profileBorder': `${client.expTable.get(storedUser.exp.voiceLevel + 1)[2]}`,
                                'profileSource.profileNameBar': `${client.expTable.get(storedUser.exp.voiceLevel + 1)[2]}`,
                                'profileSource.background': `${client.expTable.get(storedUser.exp.voiceLevel + 1)[2]}`,
                                balance: storedUser.balance + client.expTable.get(storedUser.exp.voiceLevel)[0]
                            }
                        )
                    } else {
                        await User.findOneAndUpdate(
                            { _id: storedUser._id },
                            {
                                'exp.voice': storedUser.exp.voice + 2,
                                'exp.voiceTotal': storedUser.exp.voiceTotal + 2
                            }
                        )
                    }
                }, 60000))
            }
            
        }
        
        //퇴장문
        if (oldState.channel && !newState.channel) {
            clearInterval(BalanceIntervals.get(userId))
            BalanceIntervals.delete(userId)
            clearInterval(XPIntervals.get(userId))
            XPIntervals.delete(userId)
        }
    }
}