const { SlashCommandBuilder, StringSelectMenuBuilder, EmbedBuilder, ActionRowBuilder, ChannelType } = require('discord.js');
const fs = require('fs');
const Embeds = require('../../class/embeds');
const Buttons = require('../../class/buttons');

module.exports = {
    data: {
        name: 'reportmodal'
    },
    
    async execute(interaction, client) {
        const channelId = "1096279179806375947"
        const dataUsername = interaction.fields.getTextInputValue('usernameInput');
        const dataReason = interaction.fields.getTextInputValue('reasonInput');
        
        client.channels.cache.get(channelId).send({ embeds: [
            new EmbedBuilder()
                .setColor("Red")
                .setTitle("유저신고")
                .addFields(
                    { name: "대상", value: `${dataUsername}` },
                    { name: "이유", value: `${dataReason}` })
                .setFooter({ text: `by ${interaction.member.nickname} | ${interaction.user.tag}` })        
        ]})
        interaction.reply({ embeds: [
            new EmbedBuilder()
                .setDescription("신고가 정상적으로 접수되었습니다.")], 
            ephemeral: true})
    }
}