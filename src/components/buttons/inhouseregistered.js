const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: `inhouseRegisteredButton`
    },

    async execute(interaction, client) {

        const id = interaction.message.embeds[0].data.description

        await client.users.cache.get(id).send({ embeds: [new EmbedBuilder().setColor('Green').setTitle('결과').setDescription('정상적으로 처리가 완료되었습니다!')]})
        return await interaction.update({ content: `${interaction.member.nickname}님이 수정을 완료했습니다`, components: [] });
    }
}