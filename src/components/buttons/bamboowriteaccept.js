const { ActionRowBuilder, ChannelType, EmbedBuilder } = require('discord.js');
const Embeds = require('../../class/embeds');
const Buttons = require('../../class/buttons');

module.exports = {
    data: {
        name: `writeaccept`
    },

    async execute(interaction, client) {
        const embeds = new Embeds();
        const buttons = new Buttons();

        const writeCommentButton = buttons.writeCommentButton()
        const row = new ActionRowBuilder().addComponents(writeCommentButton)

        const channel = client.channels.cache.get("1098013290996711454")
        const writeThread = await channel.threads.create({
            name: `${interaction.message.embeds[0].data.title}`,
            autoArchiveDuration: 60,
            type: ChannelType.GuildForum,
            message: { content: `${interaction.message.embeds[0].data.description}` },
        })
        await writeThread.send({ components: [row] })

        const existEmbed = new EmbedBuilder()
            .setTitle(interaction.message.embeds[0].data.title)
            .setDescription(interaction.message.embeds[0].data.description)
            .setColor("Green");

        return await interaction.update({ content: `<@&${interaction.user.id}>님이 검열 하였습니다`, embeds: [existEmbed], components: [] });
    }       
}