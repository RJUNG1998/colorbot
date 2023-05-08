const { SlashCommandBuilder, ActionRowBuilder, PermissionFlagsBits } = require('discord.js');
const Embeds = require('../../class/embeds');
const Buttons = require('../../class/buttons');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('디엠')
        .setDescription('유저에게 디엠을 합니다.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption(option =>
            option.setName('이름')
                .setDescription("대상을 선택해 주세요.")
                .setRequired(true))
        .addStringOption(option =>
            option.setName('내용')
                .setDescription("내용을 적어주세요.")
                .setRequired(true)),
    async execute(interaction, client) { 

        interaction.deferReply();

        const target = interaction.options.getUser('이름');
        const text = interaction.options.getString('내용');

        await client.users.send(`${target.id}`, `${text}`);

        interaction.deleteReply();
    }
}