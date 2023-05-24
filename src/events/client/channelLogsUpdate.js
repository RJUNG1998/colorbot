const { EmbedBuilder } = require("discord.js");
const logChannelId = '938210526994006076'

module.exports = {
    name: 'channelUpdate',
    async execute(oldChannel, newChannel, client) {
        const logChannel = client.channels.cache.get(logChannelId)
        
        // Voice Channel
        if (client.channels.cache.get(newChannel.id).type === 2) {
            logChannel.send({ embeds: [
                new EmbedBuilder()
                .setColor("Blue")
                .setDescription(`***[${oldChannel.name}]*** 채널이 ***[${newChannel.name}]*** 으로 채널명 **변경**!`)
                .setTimestamp()
            ]})
        }
    }
}