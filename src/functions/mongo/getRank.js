const User = require('../../schemas/user');

module.exports = (client) => {
    client.getRank = async (userId, guildId) => {
        const storedUser = await User.aggregate([
            {
                "$setWindowFields": {
                    "sortBy": { "balance" : -1 },
                    "output": {
                        "rank": {
                            "$documentNumber": {}
                        }
                    }
                }
            },
            {
                "$match": { "userId" : userId, "guildId" : guildId }
            }

        ])
        if (!storedUser) {
            return false;
        } else return storedUser[0];
    }
}