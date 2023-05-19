const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    data: {
        name: `inhouseAdd`
    },

    async execute(interaction, client) {
        const inhouseAddModal = new ModalBuilder()
            .setCustomId('inhouseAddModal')
            .setTitle('서브 라인 요청')
        const laneInput = new TextInputBuilder()
            .setCustomId('laneInput')
            .setLabel("추가를 원하는 라인을 모두 적어주세요")
            .setStyle(TextInputStyle.Short)
        const opggInput = new TextInputBuilder()
            .setCustomId('opggInput')
            .setLabel("opgg 링크를 복붙해 주세요")
            .setStyle(TextInputStyle.Paragraph)

        const firstActionRow = new ActionRowBuilder().addComponents(laneInput)
        const secondActionRow = new ActionRowBuilder().addComponents(opggInput)

        inhouseAddModal.addComponents(firstActionRow, secondActionRow)
        return interaction.showModal(inhouseAddModal)
    }
}