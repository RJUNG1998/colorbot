const { DiscordjsErrorCodes } = require('discord.js')
const { EmbedBuilder } = require('discord.js')
const User = require('../src/schemas/user')

const itemPickUpIntervals = new Map()

module.exports = {
    name: 'voiceStateUpdate',
    async execute(oldState, newState, client) {
        const userId = newState.id
        
        if (newState.channel && !oldState.channel) {
            await client.fetchUser(
                newState.id,
                newState.guild.id
            )
            if (!itemPickUpIntervals.has(userId)) {
                itemPickUpIntervals.set(userId, setInterval(async () => {
                    const storedUser = await client.fetchUser(
                        newState.id,
                        newState.guild.id
                    )
                    const percentage = (Math.floor(Math.random() * 99 + 1)) > 99 ? true : false
                    console.log(`${percentage}`)
                    if (percentage) {
                        const hiddenitemInv = storedUser.profileSource.hiddenitemInventory
                        if (!hiddenitemInv.includes('hiddenitem_brush')) {
                            hiddenitemInv.push('hiddenitem_brush')
                            await User.findOneAndUpdate(
                                { _id: storedUser._id },
                                {
                                    'profileSource.hiddenitem': 'hiddenitem_brush',
                                    'profileSource.hiddenitemInventory': hiddenitemInv
    
                                }
                            )
                        }
                        else if (hiddenitemInv.includes('hiddenitem_brush')) {
                            console.log(hiddenitemInv)
                            console.log("이미 아이템이 있음")
                        }
                    }
                    else {
                        console.log("획득 실패")
                    }
                }, 20000))
            }
        }

        if (oldState.channel && !newState.channel) {
            clearInterval(itemPickUpIntervals.get(userId))
            itemPickUpIntervals.delete(userId)
        }
    } 
}