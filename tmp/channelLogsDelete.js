const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'channelDelete',
    async execute(channel, client) {
        const logChannelId = '1099666225472208947'
        const logChannel = client.channels.cache.get(logChannelId)

        console.log(client.createdVoiceChannels);
        if (client.createdVoiceChannels.findKey(i=> i.id === channel.id)) {
            if (channel.type === 2) {
                logChannel.send({ embeds: [
                    new EmbedBuilder()
                        .setColor("Red")
                        .setDescription(`**${client.createdVoiceChannels.get(channel.id).name}** 채널이 **삭제**!`)
                        .setTimestamp()
                ]})
            }
        }
        // if (client.createdVoiceChannels.findKey(i => {
        //     console.log(i.id)
        // })) {
            // if (channel.type === 2) {
            //     client.createdVoice.indexOf(channel.id);

            //     logChannel.send(`${channel.name} 이 없어짐.`)
            // }
        // }
    }
}