const { ChannelType, PermissionsBitField } = require("discord.js")

module.exports = {
    name: 'voiceStateUpdate',
    async execute(oldState, newState, client) {
        
        const {member, guild} = newState
        const oldChannel = oldState.channel;
        const newChannel = newState.channel;
        const channelId = '1098846163559534633'
        const channel = client.channels.cache.get(channelId)

        if (oldChannel !== newChannel && newChannel && newChannel.id === channel.id) {
            const voiceChannel = await guild.channels.create({
                name: `통화방`,
                type: ChannelType.GuildVoice,
                parent: newChannel.parent,
                permissionOverwrites: [
                    {
                        id: member.id,
                        allow: [PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.ManageChannels],
                    },
                    {
                        id: guild.id,
                        allow: [PermissionsBitField.Flags.Connect],
                    }
                ]
            })
            client.voiceGenerator.set(member.id, voiceChannel.id)
            await newChannel.permissionOverwrites.edit(member, { Connect: false})
            setTimeout(() => newChannel.permissionOverwrites.delete(member), 30 * 1000)

            return setTimeout(() => member.voice.setChannel(voiceChannel), 500)

        }

        const ownedChannel = client.voiceGenerator.get(member.id)

        if (ownedChannel && oldChannel.id == ownedChannel && (!newChannel || newChannel.id !== ownedChannel)) {
            client.voiceGenerator.set(member.id, null)
            oldChannel.delete().catch(() => {})
        }
    }
}
