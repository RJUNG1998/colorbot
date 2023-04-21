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
            name: `${client.writeTitleData}`,
            autoArchiveDuration: 60,
            type: ChannelType.GuildForum,
            message: { content: `${client.writeCompartmentData}` },
        })
        await writeThread.send({ components: [row] })

        const existEmbed = new EmbedBuilder()
            .setTitle(interaction.message.embeds[0].data.title)
            .setDescription(interaction.message.embeds[0].data.description)
            .setColor("Green");

        return await interaction.update({ content: "검열이 완료되었습니다", embeds: [existEmbed], components: [] });
    }       
}