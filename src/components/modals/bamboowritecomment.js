const { SlashCommandBuilder, StringSelectMenuBuilder, EmbedBuilder, ActionRowBuilder, ChannelType } = require('discord.js');
const Embeds = require('../../class/embeds');

module.exports = {
    data: {
        name: 'bamboowritecommentModal'
    },

    async execute(interaction, client) {

        await interaction.deferReply()

        const embed = new Embeds();
        const writeDataComment = interaction.fields.getTextInputValue('writeCommentInput');
        const writeDataNickname = interaction.fields.getTextInputValue('writeCommentNickname');
        const channelId = "1098187386028044380"
        
        client.channels.cache.get(channelId).send({ embeds: [
            new EmbedBuilder()
                .setDescription(writeDataComment)
                .setFooter({ text: `by ${interaction.member.nickname} | ${interaction.user.tag} | ${writeDataNickname}` })        
        ]})
        await interaction.channel.send({embeds:[embed.writeCommentAnoEmbed(writeDataNickname, writeDataComment)]});

        return await interaction.deleteReply();
    }
}