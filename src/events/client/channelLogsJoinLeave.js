const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'voiceStateUpdate',
    async execute(oldState, newState, client) {

        const logChannelId = '938210526994006076'
        const logChannel = client.channels.cache.get(logChannelId)

        const guildId = newState.guild.id;
        const userId = newState.member.user.id

        const guild = client.guilds.cache.get('937556248847581244')

        const channel = oldState.channel


        //봇 일때 return
        // if (newState.member.user.bot) return;

        // if (oldState.channelId && !newState.channelId || (oldState.channelId && newState.channelId && (oldState.channelId !== newState.channelId)) && newState.channelId !== "1099655403580702760") {
        //     //완전 퇴장
        //     const channel = oldState.guild.channels.cache.get(oldState.channelId)
        //     const startTime = client.logTotalTime.get(`${guildId}-${userId}`)
        //     if (startTime) {
        //         const endTime = Date.now();
        //         const totalTimeInMs = endTime - startTime;

        //         let totalTimeInSeconds = Math.floor(totalTimeInMs / 1000);
        //         let totalTimeInMinutes = Math.floor(totalTimeInSeconds / 60);
        //         let totalTimeInHours = Math.floor(totalTimeInMinutes / 60);

        //         totalTimeInMinutes %= 60;
        //         totalTimeInSeconds %= 60;
            
        //         logChannel.send({ embeds: [
        //             new EmbedBuilder()
        //             .setColor("Red")
        //             .setDescription(`<@${oldState.member.id}>님이 <#${channel.id}>에서 **퇴장**!`)
        //             .setTimestamp()
        //             .setFooter({ text: `${totalTimeInHours}시간 ${totalTimeInMinutes}분 ${totalTimeInSeconds}초 동안 있었어요!`, iconURL: 'https://i.imgur.com/nrHdpDL.png'})
        //         ]})

        //         client.logTotalTime.delete(`${guildId}-${userId}`)
        //     }
        //     client.logTotalTime.set(`${guildId}-${userId}`, Date.now())
        // }
        // 입장문
        //     if (before.channel is None) and (before.channel != after.channel) and (after.channel) and channel:
        // (newState.channelId && !oldState.channelId || (oldState.channelId && newState.channelId && (oldState.channelId !== newState.channelId)))

        //생성문
        if ((oldState.channel && oldState.channel.id === '1099655403580702760') && (oldState.channel !== newState.channel) && (newState.channel)) {
                logChannel.send({ embeds: [
                    new EmbedBuilder()
                    .setColor("White")
                    .setDescription(`<@${newState.member.id}>님이 ***[${newState.channel.name}]*** 채널을 **__생성__**!`)
                    .setTimestamp()
                ]})
                client.createdVoiceChannels.set(newState.channel.id, {'channelNameHistory': [newState.channel.name] })
                client.logTotalTime.set(`${guildId}-${userId}`, Date.now())
        }

        //입장문
        if (newState.channel && !oldState.channel && (newState.channel.id !== '1099655403580702760')) {
            logChannel.send({ embeds: [
                new EmbedBuilder()
                .setColor("Green")
                .setDescription(`<@${newState.member.id}>님이 ***[${newState.channel.name}]*** 에 **__입장__**!`)
                .setTimestamp()
            ]})
            client.logTotalTime.set(`${guildId}-${userId}`, Date.now())
        }

        //이동문
        if ((newState.channel && oldState.channel) && (oldState.channel.id !== '1099655403580702760') && (newState.channel.id !== '1099655403580702760') && (newState.channel !== oldState.channel)) {
                logChannel.send({ embeds: [
                    new EmbedBuilder()
                    .setColor("Purple")
                    .setDescription(`<@${oldState.member.id}>님이 ***[${oldState.channel.name}]*** 에서 ***[${newState.channel.name}]*** 로 **__이동__**!`)
                    .setTimestamp()
                ]})
                client.logTotalTime.set(`${guildId}-${userId}`, Date.now())
        }
        
        //퇴장문
        if (oldState.channel && !newState.channel) {
            logChannel.send({ embeds: [
                new EmbedBuilder()
                .setColor("Red")
                .setDescription(`<@${oldState.member.id}>님이 ***[${oldState.channel.name}]*** 에서 **퇴장**!`)
                .setTimestamp()
            ]})
            client.logTotalTime.set(`${guildId}-${userId}`, Date.now())
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
        // if (newState.channelId && oldState.channel) {
        //     if (newState.channel.id !== oldState.channel.id) {
        //         const startTime = client.logTotalTime.get(`${guildId}-${userId}`)
        //         if (startTime) {
        //             const endTime = Date.now();
        //             const totalTimeInMs = endTime - startTime;

        //             let totalTimeInSeconds = Math.floor(totalTimeInMs / 1000);
        //             let totalTimeInMinutes = Math.floor(totalTimeInSeconds / 60);
        //             let totalTimeInHours = Math.floor(totalTimeInMinutes / 60);

        //             totalTimeInMinutes %= 60;
        //             totalTimeInSeconds %= 60;

        //             logChannel.send({ embeds: [
        //                 new EmbedBuilder()
        //                 .setColor("Purple")
        //                 .setDescription(`<@${oldState.member.id}>님이 <#${oldState.channelId}>에서 <#${newState.channelId}>로 이동!`)
        //                 .setTimestamp()
        //                 .setFooter({ text: `${totalTimeInHours}시간 ${totalTimeInMinutes}분 ${totalTimeInSeconds}초 동안 있었어요!`, iconURL: 'https://i.imgur.com/nrHdpDL.png'})]
        //             })

        //         client.logTotalTime.set(`${guildId}-${userId}`, Date.now())
        //         }
        //     }
        // }
    }
}
