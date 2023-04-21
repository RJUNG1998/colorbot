const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: `writedeny`
    },

    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle(interaction.message.embeds[0].data.title)
            .setDescription(interaction.message.embeds[0].data.description)
            .setColor("Red");
        return await interaction.update({ content: `<@&${interaction.user.id}>님이 검열 하였습니다`, embeds: [embed], components: [] });
    }       
}