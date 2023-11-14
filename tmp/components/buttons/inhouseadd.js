const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle,EmbedBuilder } = require('discord.js');

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

        const guild = client.guilds.cache.get('937556248847581244')
        const userId = interaction.user.id

        const riftRole = guild.members.cache.get(userId).roles.cache.has('993627158138327151')

        if (riftRole) {
            inhouseAddModal.addComponents(firstActionRow, secondActionRow)
            return interaction.showModal(inhouseAddModal)
        } else {
            interaction.reply({ embeds: [new EmbedBuilder().setDescription("<@&993627158138327151> 역할을 보유하고 있지 않아요!\n 협곡 등록을 먼저 해주세요!")], ephemeral: true })
        }
    }
}