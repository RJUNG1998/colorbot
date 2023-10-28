const { PermissionsBitField, ChannelType, EmbedBuilder } = require('discord.js');


module.exports = {
  name: 'voiceStateUpdate',
  async execute(oldState, newState, client) {

    const logChannelId = '1099666225472208947'
    const logChannel = client.channels.cache.get(logChannelId)

    const joinChannelId = '1099655403580702760'; //🗣：기본 음성채널 생성 ID
    const joinChannelId2 = '1099653075150581802'; //🗣：내전 음성채널 생성 ID
    const joinChannelId3 = '1099656691332681738'; //🗣：공부 음성채널 생성 ID
    const joinChannelId4 = '953753557499273286'; // 회의실 ID
    const joinChannelId5 = '996186899360268348'; // 잠수방 ID
    const joinChannelId6 = '1113291395264950322'; // 스테이지 ID

    //newState.member.nickname <- 본인의 닉네임 추출
    if (newState.channelId === joinChannelId) {
      const voiceChannel = await newState.guild.channels.create({
        name: `방제 변경 필수`,
        type: ChannelType.GuildVoice,
        parent: newState.channel.parentId,
        permissionOverwrites: [
          {
            id: newState.member.user.id,
            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ManageChannels],
          },
          {
            id: newState.guild.roles.everyone,
            deny: [PermissionsBitField.Flags.ViewChannel],
          },
          {
            id: newState.guild.roles.cache.get("984711293833478164"), // 부계
            allow: [PermissionsBitField.Flags.ViewChannel]
          },
          {
            id: newState.guild.roles.cache.get("1167906556281634846"), // 임시권한
            allow: [PermissionsBitField.Flags.ViewChannel]
          },
          {
            id: newState.guild.roles.cache.get("1052025464899772456"), // 손님
            allow: [PermissionsBitField.Flags.ViewChannel]
          },
          {
            id: newState.guild.roles.cache.get("1087251326171349092"), // 그레이
            allow: [PermissionsBitField.Flags.ViewChannel]
          },
          {
            id: newState.guild.roles.cache.get("952771282133463170"), // 레드
            allow: [PermissionsBitField.Flags.ViewChannel]
          },
          {
            id: newState.guild.roles.cache.get("937598204713775126"), // 오렌지
            allow: [PermissionsBitField.Flags.ViewChannel]
          },
          {
            id: newState.guild.roles.cache.get("970471835944775720"), // 옐로우
            allow: [PermissionsBitField.Flags.ViewChannel]
          },
          {
            id: newState.guild.roles.cache.get("970472217337020426"), // 그린
            allow: [PermissionsBitField.Flags.ViewChannel]
          },
          {
            id: newState.guild.roles.cache.get("970472530903191653"), // 블루
            allow: [PermissionsBitField.Flags.ViewChannel]
          },
          {
            id: newState.guild.roles.cache.get("1013129724282818600"), // 퍼플
            allow: [PermissionsBitField.Flags.ViewChannel]
          },
        ],
      });

      await newState.member.voice.setChannel(voiceChannel);
      // await logChannel.send({ embeds: [
      //     new EmbedBuilder()
      //     .setColor("Green")
      //     .setDescription(`<@${newState.member.id}>님이 <#${voiceChannel.id}>을 **생성**!`)
      //     .setTimestamp()
      // ]})
      // client.createdVoiceChannels.set(voiceChannel.id, voiceChannel);
    }

    if (newState.channelId === joinChannelId2) {
        const voiceChannel2 = await newState.guild.channels.create({
          name: `${newState.member.nickname}의 팀`,
          type: ChannelType.GuildVoice,
          parent: newState.channel.parentId,
          permissionOverwrites: [
            {
              id: newState.member.user.id,
              allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ManageChannels],
            },
            {
              id: newState.guild.roles.everyone,
              deny: [PermissionsBitField.Flags.ViewChannel],
            },
            {
              id: newState.guild.roles.cache.get("984711293833478164"), // 부계
              allow: [PermissionsBitField.Flags.ViewChannel]
            },
            {
              id: newState.guild.roles.cache.get("1087251326171349092"), // 그레이
              allow: [PermissionsBitField.Flags.ViewChannel]
            },
            {
              id: newState.guild.roles.cache.get("952771282133463170"), // 레드
              allow: [PermissionsBitField.Flags.ViewChannel]
            },
            {
              id: newState.guild.roles.cache.get("937598204713775126"), // 오렌지
              allow: [PermissionsBitField.Flags.ViewChannel]
            },
            {
              id: newState.guild.roles.cache.get("970471835944775720"), // 옐로우
              allow: [PermissionsBitField.Flags.ViewChannel]
            },
            {
              id: newState.guild.roles.cache.get("970472217337020426"), // 그린
              allow: [PermissionsBitField.Flags.ViewChannel]
            },
            {
              id: newState.guild.roles.cache.get("970472530903191653"), // 블루
              allow: [PermissionsBitField.Flags.ViewChannel]
            },
            {
              id: newState.guild.roles.cache.get("1013129724282818600"), // 퍼플
              allow: [PermissionsBitField.Flags.ViewChannel]
            },
          ],
        });
  
        await newState.member.voice.setChannel(voiceChannel2);
  
        // client.createdVoiceChannels.set(voiceChannel2.id, voiceChannel2);
      }

      if (newState.channelId === joinChannelId3) {
        const voiceChannel3 = await newState.guild.channels.create({
          name: `쉿! ${newState.member.nickname}는(은) 공부중`,
          type: ChannelType.GuildVoice,
          parent: newState.channel.parentId,
          permissionOverwrites: [
            {
              id: newState.member.user.id,
              allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ManageChannels],
            },
            {
              id: newState.guild.roles.everyone,
              deny: [PermissionsBitField.Flags.ViewChannel],
            },
            {
              id: newState.guild.roles.cache.get("984711293833478164"), // 부계
              allow: [PermissionsBitField.Flags.ViewChannel]
            },
            {
              id: newState.guild.roles.cache.get("1087251326171349092"), // 그레이
              allow: [PermissionsBitField.Flags.ViewChannel]
            },
            {
              id: newState.guild.roles.cache.get("952771282133463170"), // 레드
              allow: [PermissionsBitField.Flags.ViewChannel]
            },
            {
              id: newState.guild.roles.cache.get("937598204713775126"), // 오렌지
              allow: [PermissionsBitField.Flags.ViewChannel]
            },
            {
              id: newState.guild.roles.cache.get("970471835944775720"), // 옐로우
              allow: [PermissionsBitField.Flags.ViewChannel]
            },
            {
              id: newState.guild.roles.cache.get("970472217337020426"), // 그린
              allow: [PermissionsBitField.Flags.ViewChannel]
            },
            {
              id: newState.guild.roles.cache.get("970472530903191653"), // 블루
              allow: [PermissionsBitField.Flags.ViewChannel]
            },
            {
              id: newState.guild.roles.cache.get("1013129724282818600"), // 퍼플
              allow: [PermissionsBitField.Flags.ViewChannel]
            },
          ],
        });
  
        await newState.member.voice.setChannel(voiceChannel3);
  
        // client.createdVoiceChannels.set(voiceChannel3.id, voiceChannel3);
      }

    if (oldState.channelId && oldState.channel.members.size === 0 && oldState.channelId !== joinChannelId && oldState.channelId !== joinChannelId2 && oldState.channelId !== joinChannelId3 && oldState.channelId !== joinChannelId4 && oldState.channelId !== joinChannelId5 && oldState.channelId !== joinChannelId6) {
      const voiceChannel = await oldState.guild.channels.fetch(oldState.channelId).catch(console.error);
      if (voiceChannel && voiceChannel.members.size === 0 ) {

        await voiceChannel.delete().catch(console.error);

        // client.createdVoiceChannels.delete(voiceChannel.id);
      }
    }
  }
}