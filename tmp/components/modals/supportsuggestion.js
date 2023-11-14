const { SlashCommandBuilder, StringSelectMenuBuilder, EmbedBuilder, ActionRowBuilder, ChannelType } = require('discord.js');
const fs = require('fs');
const Embeds = require('../../class/embeds');
const Buttons = require('../../class/buttons');

module.exports = {
    data: {
        name: 'suggestionmodal'
    },
    
    async execute(interaction, client) {
        const channelId = "1096279179806375947"
        const dataText = interaction.fields.getTextInputValue('textInput')
        client.channels.cache.get(channelId).send({ embeds: [
            new EmbedBuilder()
                .setColor("Yellow")
                .setTitle("개선요청")
                .addFields(
                    { name: "사항", value: `${dataText}` })
                .setFooter({ text: `by ${interaction.member.nickname} | ${interaction.user.tag}` })        
        ]})
        interaction.reply({ embeds: [
            new EmbedBuilder()
                .setDescription("요청이 정상적으로 접수되었어요!")], 
            ephemeral: true})
    }
}