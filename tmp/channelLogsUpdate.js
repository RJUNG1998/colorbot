const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: 'channelUpdate',
    async execute(oldChannel, newChannel, client) {
        const logChannelId = '1099666225472208947'
        const logChannel = client.channels.cache.get(logChannelId)
        
        // Voice Channel
        if (client.channels.cache.get(newChannel.id).type === 2) {
            logChannel.send({ embeds: [
                new EmbedBuilder()
                .setColor("Blue")
                .setDescription(`**${oldChannel.name}** 채널이 <#${newChannel.id}> 으로 채널명 **변경**!`)
                .setTimestamp()
            ]})
        }
    }
}