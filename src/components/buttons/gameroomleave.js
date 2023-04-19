const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const fs = require('fs');
const Embeds = require('../../class/embeds');
const priceAdjust = require('../../class/priceAdjust');

module.exports = {
    data: {
        name: `gameroomleave`
    },

    async execute(interaction, client) {
        const gameroomData = JSON.parse(fs.readFileSync(`./data/gameroom/gameroom.json`, "utf-8"));
        const gameroomEmbed = await client.channels.cache.get(gameroomData.message.channelId).messages.fetch(gameroomData.message.id);
        // console.log(client.channels.cache.get(interaction.message.channelId));
        // const thread = client.channels.cache.get(interaction.message.channelId).threads.cache.find(x => x.name === interaction.message.embeds[0].data.title)
        await client.channels.cache.get(interaction.message.channelId).members.remove(interaction.user.id);
        // client.channels.cache.get(gameroomData.message.channelId).threads.cache.find(x => x.name === gameroomData);
    }
}