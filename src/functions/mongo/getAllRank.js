const User = require('../../schemas/user');

module.exports = (client) => {
    client.getAllRank = async (guildId) => {
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
                "$match": { "guildId" : guildId }
            }
        ])
        if (!storedUser) {
            return false;
        } else return storedUser;
    }
}