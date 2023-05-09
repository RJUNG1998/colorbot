const { SlashCommandBuilder, ActionRowBuilder, PermissionFlagsBits } = require('discord.js');
const Embeds = require('../../class/embeds');
const Buttons = require('../../class/buttons');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('내전임베드')
        .setDescription('내전 관련 임베드를 생성합니다.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {
        await interaction.deferReply();

        const embeds = new Embeds();

        const embed = embeds.inhouseEmbed();

        interaction.channel.send({ content: '<@&993627158138327151> <@&993626949471699067> <@&1097697913859223622>', embeds: [embed] });

        return await interaction.deleteReply();
    }
}