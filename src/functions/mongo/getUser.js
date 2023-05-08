const User = require('../../schemas/user');

module.exports = (client) => {
    client.getUser = async (userId, guildId) => {
        const storedUser = await User.findOne({ userId: userId, guildId: guildId });
        
        if (!storedUser) {
            return false;
        } else return storedUser;
    }
}