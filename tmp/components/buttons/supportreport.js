const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    data: {
        name: `supportreport`
    },

    async execute(interaction, client) {
        const ReportModal = new ModalBuilder()
                .setCustomId('reportmodal')
                .setTitle('유저 신고 (익명보장)')
        const usernameInput = new TextInputBuilder()
                .setCustomId('usernameInput')
                .setLabel("신고 대상의 닉네임을 적어주세요")
                .setStyle(TextInputStyle.Short)
                .setMaxLength(10)
                .setRequired(true)
        const reasonInput = new TextInputBuilder()
                .setCustomId('reasonInput')
                .setLabel("신고 사유를 적어주세요")
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true)

        const firstActionRow = new ActionRowBuilder().addComponents(usernameInput)
        const secondActionRow = new ActionRowBuilder().addComponents(reasonInput)

        ReportModal.addComponents(firstActionRow, secondActionRow)
        return interaction.showModal(ReportModal);
    }
}
