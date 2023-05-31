const VoteTimeout = require("./vote-class")
const Vote = require('../../schemas/vote')

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {

        const storedVote = await Vote.find({})

        for(const data of storedVote) {
            VoteTimeout.timeStart(data.executedate, data.userId)
        }
    }
}