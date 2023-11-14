const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    data: {
        name: `inhouseAnswer`
    },

    async execute(interaction, client) {
        const inhouseAnswerModal = new ModalBuilder()
            .setCustomId('inhouseAnswerModal')
            .setTitle('답변하기')
        const answerInput = new TextInputBuilder()
            .setCustomId('answerInput')
            .setLabel('질문의 답을 적어주세요')
            .setStyle(TextInputStyle.Paragraph)

        const firstActionRow = new ActionRowBuilder().addComponents(answerInput)

        inhouseAnswerModal.addComponents(firstActionRow)
        return interaction.showModal(inhouseAnswerModal)
    }
}