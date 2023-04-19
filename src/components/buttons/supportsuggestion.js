const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const fs = require('fs');
const Embeds = require('../../class/embeds');
const priceAdjust = require('../../class/priceAdjust');

module.exports = {
    data: {
        name: `supportsuggestion`
    },

    async execute(interaction, client) {
        const SuggestionModal = new ModalBuilder()
                .setCustomId('suggestionmodal')
                .setTitle('개선 제의 (실명제도)')
        const textInput = new TextInputBuilder()
                .setCustomId('textInput')
                .setLabel("요구사항을 적어주세요")
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true)

        const row = new ActionRowBuilder().addComponents(textInput)

        SuggestionModal.addComponents(row)
        return interaction.showModal(SuggestionModal);
    }
}
