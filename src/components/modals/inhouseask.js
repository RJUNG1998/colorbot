const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const Embeds = require('../../class/embeds');
const Buttons = require('../../class/buttons');

module.exports = {
    data: {
        name: `inhouseAskModal`
    },

    async execute(interaction, client) {

        const button = new Buttons()
        const answer = button.inhouseButton('inhouseAnswer')

        const row = new ActionRowBuilder().addComponents(answer)

        const channelId = '1108272461537099868'
        const userId = interaction.user.id 

        const dataAskName = interaction.fields.getTextInputValue('inhouseAskNameInput')
        const dataAskQuestion = interaction.fields.getTextInputValue('inhouseAskQuestion')

        client.channels.cache.get(channelId).send({ embeds: [
            new EmbedBuilder()
                .setColor('White')
                .setTitle('질문')
                .setDescription(`${interaction.user.id}`)
                .addFields(
                    { name: "`질문자`", value: `*${dataAskName}*`},
                    { name: "`질문`", value: `*${dataAskQuestion}*`},
                )
                .setFooter({ text: `${userId}` })], components: [row]
            })
        
        interaction.reply({ embeds: [
            new EmbedBuilder()
                .setTitle("요청 완료")
                .setDescription("이 작업은 다소 시간이 걸릴 수 있으며,\n답변은 DM으로 전달될 예정입니다.")],
             ephemeral: true})
    }
}