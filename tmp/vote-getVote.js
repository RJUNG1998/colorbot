const Vote = require('../../schemas/vote')

module.exports = (client) => {
    client.getVote = async (userId) => {
        const storedVote = await Vote.findOne({ userId: userId })

        if (!storedVote) {
            return false;
        } else return storedVote
    }
}