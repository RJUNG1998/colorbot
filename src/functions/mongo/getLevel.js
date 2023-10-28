const User = require('../../schemas/user');

module.exports = (client) => {
    client.getLevel = async (userId, guildId) => {
        const storedUser = await User.aggregate([
            {
                "$setWindowFields": {
                    "sortBy": { "exp.voiceTotal" : -1 },
                    "output": {
                        "rank": {
                            "$documentNumber": {}
                        }
                    }
                }
            },
            {
                "$match": { "guildId" : guildId, "userId" : userId }
            }
        ])
        if (!storedUser) {
            return false;
        } else return storedUser;
    }
}