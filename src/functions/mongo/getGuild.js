const User = require('../../schemas/guild');

module.exports = (client) => {
    client.getGuild = async (guildName) => {
        const storedGuild = await User.findOne({ guildName: guildName});
        
        if (!storedGuild) {
            return false;
        } else return storedUser;
    }
}