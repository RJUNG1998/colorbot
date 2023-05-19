const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    data: {
        name: `inhouseRegister`
    },

    async execute(interaction, client) {
        const registerModal = new ModalBuilder()
                .setCustomId('registerModal')
                .setTitle('내전 등록')
        const desireInput = new TextInputBuilder()
                .setCustomId('desireInput')
                .setLabel("희망하는 내전 종류를 전부 적어주세요")
                .setPlaceholder('예) 협곡, 칼바람, 발로란트')
                .setValue('예) 협곡, 칼바람, 발로란트')
                .setStyle(TextInputStyle.Short)
        const tagInput = new TextInputBuilder()
                .setCustomId('tagInput')
                .setLabel("라이엇 태그를 적어주세요")
                .setPlaceholder('발로 내전을 희망하지 않는다면 X를 적어주세요')
                .setValue('발로 내전을 희망하지 않는다면 X를 적어주세요')
                .setStyle(TextInputStyle.Short)
        const ignInput = new TextInputBuilder()
                .setCustomId('ignInput')
                .setLabel("opgg 링크를 복붙해 주세요")
                .setPlaceholder('롤 내전을 희망하지 않는다면 X를 적어주세요')
                .setValue('롤 내전을 희망하지 않는다면 X를 적어주세요')
                .setStyle(TextInputStyle.Paragraph)

        const firstActionRow = new ActionRowBuilder().addComponents(desireInput)
        const secondActionRow = new ActionRowBuilder().addComponents(tagInput)
        const thirdActionRow = new ActionRowBuilder().addComponents(ignInput)

        registerModal.addComponents(firstActionRow, secondActionRow, thirdActionRow)
        return interaction.showModal(registerModal)
    }
}