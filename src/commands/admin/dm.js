const { SlashCommandBuilder, ActionRowBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
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

        const target = interaction.options.getUser('이름');
        const text = interaction.options.getString('내용');

        const embed = new EmbedBuilder().setColor('Blue').setTitle('결과').setDescription(`${text}`)

        await client.users.send(`${target.id}`, {embeds: [embed]});

        interaction.reply({ embeds: [new EmbedBuilder().setColor('Green').setTitle('DM 전송 완료').addFields({ name: '대상', value: `${target}`}, { name: '내용', value: `${text}`}).setFooter({text: `${interaction.member.nickname} | ${interaction.user.tag} 님이 전송`})]});
    }
}