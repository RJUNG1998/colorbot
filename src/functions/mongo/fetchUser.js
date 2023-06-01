const User = require('../../schemas/user');
const { Types } = require('mongoose')

module.exports = (client) => {
    client.fetchUser = async (userId, guildId) => {
        let storedUser = await User.findOne({ userId: userId, guildId: guildId });
        
        if (!storedUser) {
            storedUser = new User({
                _id: new Types.ObjectId(),
                userId: userId,
                guildId: guildId,
                attendance: new Date("01/01/2000 00:00")
            });
            await storedUser.save().then(async user => {
                console.log(`[User Created]: UserID: ${userId}, GuildID: ${guildId}`);
            }).catch(console.error);
            // storedUser = await User.findOne({ userId: userId, guildId: guildId });
            return storedUser; 
        } else return storedUser;
    }
}