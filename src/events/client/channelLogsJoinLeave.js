const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'voiceStateUpdate',
    async execute(oldState, newState, client) {

        const logChannelId = '938210526994006076'
        const logChannel = client.channels.cache.get(logChannelId)

        const guildId = newState.guild.id;
        const userId = newState.member.user.id

        //봇 일때 return
        if (newState.member.user.bot) return;

        if (oldState.channelId && !newState.channelId || (oldState.channelId && newState.channelId && (oldState.channelId !== newState.channelId)) && newState.channelId !== "1099655403580702760") {
            //완전 퇴장
            const channel = oldState.guild.channels.cache.get(oldState.channelId)
            const startTime = client.logTotalTime.get(`${guildId}-${userId}`)
            if (startTime) {
                const endTime = Date.now();
                const totalTimeInMs = endTime - startTime;

                let totalTimeInSeconds = Math.floor(totalTimeInMs / 1000);
                let totalTimeInMinutes = Math.floor(totalTimeInSeconds / 60);
                let totalTimeInHours = Math.floor(totalTimeInMinutes / 60);

                totalTimeInMinutes %= 60;
                totalTimeInSeconds %= 60;
            
                logChannel.send({ embeds: [
                    new EmbedBuilder()
                    .setColor("Red")
                    .setDescription(`<@${oldState.member.id}>님이 <#${channel.id}>에서 **퇴장**!`)
                    .setTimestamp()
                    .setFooter({ text: `${totalTimeInHours}시간 ${totalTimeInMinutes}분 ${totalTimeInSeconds}초 동안 있었어요!`, iconURL: 'https://i.imgur.com/nrHdpDL.png'})
                ]})

                client.logTotalTime.delete(`${guildId}-${userId}`)
            }
            client.logTotalTime.set(`${guildId}-${userId}`, Date.now())
        }
        // 입장문
        if (newState.channelId && !oldState.channelId || (oldState.channelId && newState.channelId && (oldState.channelId !== newState.channelId))) {
            const channel = newState.guild.channels.cache.get(newState.channelId)
            if (channel.id !== "938210526994006076") {
                logChannel.send({ embeds: [
                    new EmbedBuilder()
                    .setColor("Purple")
                    .setDescription(`<@${newState.member.id}>님이 <#${channel.id}>에 **입장**!`)
                    .setTimestamp()
                ]})
                client.logTotalTime.set(`${guildId}-${userId}`, Date.now())
            }
        }

        // // 퇴장문
        // if (((oldState.channelId && !newState.channelId) || (oldState.channelId && newState.channelId && (oldState.channelId !== newState.channelId))) && (newState.channelId !== "1099655403580702760")) {
            // const channel = oldState.guild.channels.cache.get(oldState.channelId)
            // const startTime = client.logTotalTime.get(`${guildId}-${userId}`)
            // console.log(oldState.guild.joinedTimestamp)
            // if (startTime) {
            //     const endTime = Date.now();
            //     const totalTimeInMs = endTime - startTime;

            //     let totalTimeInSeconds = Math.floor(totalTimeInMs / 1000);
            //     let totalTimeInMinutes = Math.floor(totalTimeInSeconds / 60);
            //     let totalTimeInHours = Math.floor(totalTimeInMinutes / 60);

            //     totalTimeInMinutes %= 60;
            //     totalTimeInSeconds %= 60;
            
            //     logChannel.send({ embeds: [
            //         new EmbedBuilder()
            //         .setColor("Red")
            //         .setDescription(`<@${oldState.member.id}>님이 <#${channel.id}>에서 **퇴장**!`)
            //         .setTimestamp()
            //         .setFooter({ text: `${totalTimeInHours}시간 ${totalTimeInMinutes}분 ${totalTimeInSeconds}초 동안 있었어요!`, iconURL: 'https://i.imgur.com/nrHdpDL.png'})
            //     ]})

            //     client.logTotalTime.delete(`${guildId}-${userId}`)
            // }
        // } 
        
        // 이동문
        if (newState.channelId && oldState.channel) {
            if (newState.channel.id !== oldState.channel.id) {
                const startTime = client.logTotalTime.get(`${guildId}-${userId}`)
                if (startTime) {
                    const endTime = Date.now();
                    const totalTimeInMs = endTime - startTime;

                    let totalTimeInSeconds = Math.floor(totalTimeInMs / 1000);
                    let totalTimeInMinutes = Math.floor(totalTimeInSeconds / 60);
                    let totalTimeInHours = Math.floor(totalTimeInMinutes / 60);

                    totalTimeInMinutes %= 60;
                    totalTimeInSeconds %= 60;

                    logChannel.send({ embeds: [
                        new EmbedBuilder()
                        .setColor("Purple")
                        .setDescription(`<@${oldState.member.id}>님이 <#${oldState.channelId}>에서 <#${newState.channelId}>로 이동!`)
                        .setTimestamp()
                        .setFooter({ text: `${totalTimeInHours}시간 ${totalTimeInMinutes}분 ${totalTimeInSeconds}초 동안 있었어요!`, iconURL: 'https://i.imgur.com/nrHdpDL.png'})]
                    })

                client.logTotalTime.set(`${guildId}-${userId}`, Date.now())
                }
            }
        }
    }
}
