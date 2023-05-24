const { EmbedBuilder } = require("discord.js");
const logChannelId = '938210526994006076'

module.exports = {
    name: 'channelUpdate',
    async execute(oldChannel, newChannel, client) {
        const logChannel = client.channels.cache.get(logChannelId)
        const joinChannelId = ['1099655403580702760', '1099653075150581802', '1099656691332681738', '953753557499273286', '996186899360268348']; //🗣：기본 음성채널 생성 ID

        // Voice Channel
        if (client.channels.cache.get(newChannel.id).type === 2 && !newChannel.id.includes(joinChannelId) && oldChannel.name !== newChannel.name) {
            logChannel.send({ embeds: [
                new EmbedBuilder()
                .setColor("Blue")
                .setDescription(`***[${oldChannel.name}]*** 채널이 ***[${newChannel.name}]*** 으로 채널명 **변경**!`)
                .setTimestamp()
            ]})
        }
    }
}