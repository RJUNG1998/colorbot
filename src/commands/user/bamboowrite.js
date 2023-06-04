const { SlashCommandBuilder, ActionRowBuilder, TextInputBuilder, ModalBuilder, TextInputStyle } = require('discord.js');
const Embeds = require('../src/class/embeds');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('글쓰기')
        .setDescription('대나무 숲에 글을 적습니다'),
    async execute(interaction, client) {
        const modal = new ModalBuilder()
            .setCustomId('bamboowriteModal')
            .setTitle('대나무숲 글 적기')
        
        const titleinput = new TextInputBuilder()
            .setCustomId('writeTitleInput')
            .setLabel("글의 제목을 정해주세요")
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
        
        const compartmentinput = new TextInputBuilder()
            .setCustomId('writeCompartmentInput')
            .setLabel("글의 내용을 적어주세요")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true)

        const firstActionRow = new ActionRowBuilder().addComponents(titleinput)
        const secondActionRow = new ActionRowBuilder().addComponents(compartmentinput)

        modal.addComponents(firstActionRow, secondActionRow)
        interaction.showModal(modal)
    }
}