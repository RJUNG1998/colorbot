const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const fs = require('fs');
const Embeds = require('../../class/embeds');
const priceAdjust = require('../../class/priceAdjust');

module.exports = {
    data: {
        name: `gameroomcreate`
    },

    async execute(interaction, client) {
        const modal = new ModalBuilder()
            .setCustomId('gameroomcreate')
            .setTitle("게임 대기방 만들기")

        const game = new TextInputBuilder()
            .setCustomId('game')
            .setLabel("게임을 입력해주세요: 롤, 발로란트, etc...")
            .setRequired(true)
            .setStyle(TextInputStyle.Short);

        const description = new TextInputBuilder()
            .setCustomId('description')
            .setLabel("게임방 제목을 적어주세요")
            .setRequired(true)
            .setStyle(TextInputStyle.Short) 

        const limit = new TextInputBuilder()
            .setCustomId('limit')
            .setLabel("인원 수를 적어주세요")
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
        
        const firstrow = new ActionRowBuilder().addComponents(description);
        const secondrow = new ActionRowBuilder().addComponents(game);
        const thirdrow = new ActionRowBuilder().addComponents(limit);

        modal.addComponents(firstrow, secondrow, thirdrow);

        return interaction.showModal(modal);
    }
}