const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const Embeds = require('../../class/embeds');
const Buttons = require('../../class/buttons');

module.exports = {
    data: {
        name: `writeCommentButton`
    },

    async execute(interaction, client) {
        const modal = new ModalBuilder()
            .setCustomId('bamboowritecommentModal')
            .setTitle('대나무숲 글 적기')
        
        const nicknameinput = new TextInputBuilder()
            .setCustomId('writeCommentNickname')
            .setLabel("닉네임을 적어주세요.")
            .setStyle(TextInputStyle.Short)
            .setRequired(true)

        const compartmentinput = new TextInputBuilder()
            .setCustomId('writeCommentInput')
            .setLabel("글의 내용을 적어주세요.")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true)
        
        const firstActionRow = new ActionRowBuilder().addComponents(nicknameinput)
        const secondActionRow = new ActionRowBuilder().addComponents(compartmentinput)

        modal.addComponents(firstActionRow, secondActionRow)
        interaction.showModal(modal)
    }       
}