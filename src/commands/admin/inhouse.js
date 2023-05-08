const { SlashCommandBuilder, ActionRowBuilder, PermissionFlagsBits } = require('discord.js');
const Embeds = require('../../class/embeds');
const Buttons = require('../../class/buttons');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('내전')
        .setDescription('내전 관련 임베드를 생성합니다.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {
        await interaction.deferReply();

        const embeds = new Embeds();

        const embed = embeds.inhouseEmbed();

        interaction.channel.send({ embeds: [embed] });

        return await interaction.deleteReply();
    }
}