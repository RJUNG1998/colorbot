const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const Vote = require('../../schemas/vote')
const Mongoose = require('mongoose');
const VoteTimeout = require('../../class/votetimeout')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('멤버투표')
        .setDescription('설명')
        .addUserOption(option =>
            option
                .setName('유저')
                .setDescription('설명'))
        .addStringOption(option =>
            option
                .setName('시간')
                .setDescription('설명')
                .addChoices(
                    { name: '10초', value: '10000'},
                    { name: '2주', value: '1209600000'}
                )),
    async execute(interaction, client) {
        const selectedUser = interaction.options.getUser('유저')
        const selectedTime = Number(interaction.options.getString('시간'))

        const today = Number(new Date().getTime())
        const laterString = today + selectedTime
        const later = parseInt(laterString)

        const storedVote = await client.getVote(selectedUser.id)

        if (!storedVote) {
            const newData = await new Vote({
                _id: new Mongoose.Types.ObjectId,
                userId: selectedUser.id,
                executedate: later
            })
            await newData.save().then(async vote => {
                console.log(`[생성완료]`)
            }).catch(console.error)
            interaction.reply({
                content: `[생성완료] 유저ID: ${newData.userId}, 날짜: ${newData.executedate}`,
                ephemeral: true
            })
            VoteTimeout.timeStart(later, selectedUser.id)
        } else {
            await Vote.findOneAndDelete({
                userId: selectedUser.id,
                executedate: storedVote.executedate
            })
            interaction.reply({ content: `이미 있음: ${storedVote}`, ephemeral: true })
        }
    }
}