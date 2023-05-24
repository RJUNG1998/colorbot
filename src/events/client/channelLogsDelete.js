const { EmbedBuilder } = require("discord.js");
const logChannelId = '938210526994006076'

module.exports = {
    name: 'channelDelete',
    async execute(channel, client) {
        const logChannel = client.channels.cache.get(logChannelId)

        if (channel.type === 2) {
            logChannel.send({ embeds: [
                new EmbedBuilder()
                    .setColor('Grey')
                    .setDescription(`***[${client.createdVoiceChannels.get(String(channel.id)).channelNameHistory.pop()}]*** 채널이 **삭제**!`)
                    .setTimestamp()
            ]})
            // client.createdVoiceChannels.delete(channel.id)
        }
        
    }
}