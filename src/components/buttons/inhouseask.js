const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    data: {
        name: `inhouseAsk`
    },

    async execute(interaction, client) {
        const inhouseAskModal = new ModalBuilder()
            .setCustomId('inhouseAskModal')
            .setTitle('질문하기')
        const inhouseAskNameInput = new TextInputBuilder()
            .setCustomId('inhouseAskNameInput')
            .setLabel('팔레트에서 사용중인 이름을 적어주세요')
            .setPlaceholder('예) 모링')
            .setValue('예) 모링')
            .setStyle(TextInputStyle.Short)
        const inhouseAskQuestion = new TextInputBuilder()
            .setCustomId('inhouseAskQuestion')
            .setLabel('내전 관련 질문을 적어주세요')
            .setPlaceholder('예) 모링님의 아칼리는 왼쪽 팔인가요 오른쪽 팔인가요?')
            .setValue('예) 모링님의 아칼리는 왼쪽 팔인가요 오른쪽 팔인가요?')
            .setStyle(TextInputStyle.Paragraph)

        const firstActionRow = new ActionRowBuilder().addComponents(inhouseAskNameInput)
        const secondActionRow = new ActionRowBuilder().addComponents(inhouseAskQuestion)

        inhouseAskModal.addComponents(firstActionRow, secondActionRow)
        return interaction.showModal(inhouseAskModal)
    }
}