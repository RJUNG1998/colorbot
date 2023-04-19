const { ActionRowBuilder, ChannelType, PermissionsBitField, EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');
const Embeds = require('../../class/embeds');
const Buttons = require('../../class/buttons');
const priceAdjust = require('../../class/priceAdjust');

module.exports = {
    data: {
        name: `supportsupport`
    },

    async execute(interaction, client) {
        const buttons = new Buttons();
        
        const guild = client.guilds.cache.get("937556248847581244");
        const channel = await interaction.guild.channels.create({
            name: `${interaction.member.nickname}의 티켓`,
            type: ChannelType.GuildText,
            permissionOverwrites: [
                {
                    id: guild.id,
                    deny: [PermissionsBitField.Flags.ViewChannel],
                },
                {
                    id: interaction.user.id,
                    allow: [PermissionsBitField.Flags.ViewChannel],
                },
                {
                    id: interaction.user.id,
                    allow: [PermissionsBitField.Flags.SendMessages],
                }]
        })
        channel.permissionOverwrites.edit(interaction.user.id, { ViewChannel: true });
        interaction.reply({ embeds: [
            new EmbedBuilder()
                .setDescription(`채널이 정상적으로 생성되었어요! <#${channel.id}>에서 대화를 시작하세요!`)], 
            ephemeral: true})
        const exitButton = buttons.supportButton("supportsupportexit");
        const row = new ActionRowBuilder().addComponents(exitButton)
        const embed = new EmbedBuilder()
            .setDescription("밑에 버튼을 눌러 티켓을 닫으세요!")
            .setColor("Red")
        return channel.send({ embeds: [embed], components: [row] }) 
    }
}
