const Guild = require('../../schemas/guild');

module.exports = (client) => {
    client.getGuild = async (guildName) => {
        const storedGuild = await Guild.findOne({ guildName: guildName});
        
        if (!storedGuild) {
            return false;
        } else return storedUser;
    }
}