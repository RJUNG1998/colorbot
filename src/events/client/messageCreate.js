const User = require('../../schemas/user')

module.exports = {
    name: "messageCreate",
    async execute(message, client) {
        if (message.author.bot) return;

        const AMOUNT = 5
        const storedUser = await client.fetchUser(
            message.author.id,
            message.guild.id
        );

        const today = new Date();
        
        if (Number(today) - Number(storedUser.cooldown.chat) > 60000) {
            await User.findOneAndUpdate(
                { _id: storedUser._id },
                { 
                    'cooldown.chat': today,
                    balance: await storedUser.balance + AMOUNT
                }
            )
        }
    }
}