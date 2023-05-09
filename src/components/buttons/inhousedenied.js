const { EmbedBuilder, InteractionResponse } = require('discord.js');

module.exports = {
    data: {
        name: `inhouseDeniedButton`
    },

    async execute(interaction, client) {

        const id = interaction.message.embeds[0].data.description

        await client.users.cache.get(id).send({ embeds: [new EmbedBuilder().setColor('Red').setTitle('결과').setDescription('해당 요청은 거절되었으며 이유는 아래와 같을 수 있습니다.\n\n1. 롤 등록이 이미 되어있거나 롤 닉네임이 정확하지 않을 경우\n2. 발로란트 등록이 이미 되어있거나 발로란트 태그가 정확하지 않을 경우\n3. 요청 라인을 검토하기 전 롤 혹은 발로란트 등록이 먼저 안 되어 있는 경우\n4. 요청 라인의 전적의 수가 미달이거나 부족한 경우\n\n 만약 4개 중 하나라도 해당이 안된다고 생각하시면\n내전관리자들에게 도움을 요청해주시길 바랍니다.')]})
        return await interaction.update({ content: `${interaction.member.nickname}님이 수정을 완료했습니다`, components: [] });
    }
}