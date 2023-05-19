const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, PermissionFlagsBits } = require('discord.js');
const Embeds = require('../../class/embeds');
const Buttons = require('../../class/buttons');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('내전임베드')
        .setDescription('내전 관련 임베드를 생성합니다')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction, client) {

        await interaction.deferReply();

        const embeds = new Embeds();
        const embed = embeds.inhouseEmbed()

        const buttons = new Buttons();
        const register = buttons.inhouseButton('inhouseRegister')
        const add = buttons.inhouseButton('inhouseAdd')
        const ask = buttons.inhouseButton('inhouseAsk')
        const link = buttons.inhouseButton('inhouseLink')

        const row = new ActionRowBuilder().addComponents(register, add, ask, link)

        interaction.channel.send({ embeds: [embed], components: [row] })

        return await interaction.deleteReply();
    }
}