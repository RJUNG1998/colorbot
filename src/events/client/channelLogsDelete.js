const { EmbedBuilder } = require("discord.js");
const logChannelId = '938210526994006076'


module.exports = {
    name: 'channelDelete',
    async execute(channel, client) {
        const logChannel = client.channels.cache.get(logChannelId)
        const joinChannelId = ['1099655403580702760', '1099653075150581802', '1099656691332681738', '953753557499273286', '996186899360268348']; //🗣：기본 음성채널 생성 ID
        
        if (channel.type === 2 && !joinChannelId.includes(channel.id)) {
            logChannel.send({ embeds: [
                new EmbedBuilder()
                    .setColor('Grey')
                    .setDescription(`***[${channel.name}]*** 채널이 **삭제**!`)
                    .setTimestamp()
            ]})
            // client.createdVoiceChannels.delete(channel.id)
        }
        
    }
}