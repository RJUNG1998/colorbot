const User = require('../../schemas/user');

module.exports = (client) => {
    client.getAllLevel = async (guildId) => {
        const storedUser = await User.aggregate([
            {
                "$setWindowFields": {
                    "sortBy": { "exp.voiceLevel" : -1 },
                    "output": {
                        "rank": {
                            "$documentNumber": {}
                        }
                    }
                }
            },
            {
                "$match": { "guildId" : guildId }
            }
        ])
        if (!storedUser) {
            return false;
        } else return storedUser;
    }
}