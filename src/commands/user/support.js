const { SlashCommandBuilder, ActionRowBuilder } = require('discord.js');
const Embeds = require('../../class/embeds');
const Buttons = require('../../class/buttons');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('건의')
        .setDescription('종합 건의함을 생성합니다.')
        .setDefaultMemberPermissions(0),
    async execute(interaction, client) {
        const embeds = new Embeds();
        const buttons = new Buttons();

        const embed = embeds.supportEmbed();
        
        const reportButton = buttons.supportButton('supportreport');
        const suggestionButton = buttons.supportButton('supportsuggestion');
        const supportButton = buttons.supportButton('supportsupport');

        const row = new ActionRowBuilder().addComponents(reportButton, suggestionButton, supportButton)
        interaction.channel.send({ embeds: [embed], components: [row] });
    }
}