const { EmbedBuilder } = require("discord.js");
const logChannelId = '938210526994006076'

module.exports = {
    name: 'channelCreate',
    async execute(channel, client) {
        const logChannel = client.channels.cache.get(logChannelId) //입장로그 채널 받기

        const AuditLogFetch = await channel.guild.fetchAuditLogs({ limit: 1, type: 10 }); // Fetching the audot logs.
        if (!AuditLogFetch.entries.first()) return console.error(`No entries found.`);

        const Entry = AuditLogFetch.entries.first(); // Getting the first entry of AuditLogs that was found.

        logChannel.send(`${Entry.executor.tag || `Someone`} created a new channel. | ${channel}`) // Sending the message to the logging channel.


        // if (channel.type === 2) {
        //     client.createdVoiceChannels.set(channel.id, {'channelNameHistory': [channel.name] })
        //     logChannel.send({ embeds: [
        //         new EmbedBuilder()
        //             .setColor("Green")
        //             .setDescription(`**${channel.name}** 채널이 **생성**!`)
        //             .setTimestamp()
        //     ]})
        // }
    }
}