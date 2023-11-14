const { SlashCommandBuilder, ComponentType, StringSelectMenuBuilder, EmbedBuilder, ActionRowBuilder, ChannelType, Collector } = require('discord.js');
const fs = require('fs');
const Embeds = require('../../class/embeds');
const Buttons = require('../../class/buttons');

module.exports = {
    data: {
        name: 'inhouseAnswerModal'
    },

    async execute(interaction, client) {
        const userId = interaction.message.embeds[0].data.description
        const dataAsnwer = interaction.fields.getTextInputValue('answerInput')

        await client.users.cache.get(userId).send({ embeds: [
            new EmbedBuilder()
                .setColor('Purple')
                .setTitle('답변')
                .setDescription(`${dataAsnwer}`)
        ]})

        await interaction.update({ content: `${interaction.member.nickname}님이 답변을 완료했습니다`, components: [] })
        interaction.followUp({ embeds: [new EmbedBuilder().setDescription(`||${dataAsnwer}||`)]})
    }
}