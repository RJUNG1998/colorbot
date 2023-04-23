// const { PermissionsBitField, ChannelType } = require('discord.js');


// module.exports = {
//   name: 'voiceStateUpdate',
//   async execute(oldState, newState, client) {

//     const joinChannelId = '1099273794603982918'; //🗣：음성채널_생성하기 채널 ID
//     const messages = [
//         "블랙빈은 일해라",
//         "니즈는 쉴게",
//         "꼬마는 연습해라",
//         "두부는 두부김치",
//         "모링은 또 정지야?",
//         "우주는 스카이캐슬",
//         "사월은 너의 거짓말",
//         "에핑은 에이핑크",
//         "포비는 뽀로로 친구",
//         "요쿵은 찍먹금지",
//         "이안은 퐉스야",
//         "힝은 위대해",
//         "흑곰은 사람을 찢어",
//         "호키는 호키포키",
//         "토토로는 이웃집",
//         "카일은 나라카일",
//         "칠월은 줄라이",
//         "추여비는 추어탕",
//         "참치는 고추참치",
//         "준영은 평범해",
//         "제케는 JK타이거",
//         "샤크는 아기상어",
//         "사과맛사탕은 달아",
//         "삑궷츢은 삐까삐까",
//         "빅보이최는 조ㄴ나 커",
//         "비스바덴은 교수야",
//         "나 민재등장!",
//         "마루는 호두마루",
//         "랑비는 얇은비",
//         "도도새는 멸종",
//         "누피는 스누피"
//     ]
//     const randomMessage = messages[Math.floor(Math.random() * messages.length)]

//     //newState.member.nickname <- 본인의 닉네임 추출
//     if (newState.channelId === joinChannelId) {
//       const voiceChannel = await newState.guild.channels.create({
//         name: `${randomMessage}`,
//         type: ChannelType.GuildVoice,
//         parent: newState.channel.parentId,
//         permissionOverwrites: [
//           {
//             id: newState.member.user.id,
//             allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ManageChannels],
//           },
//           {
//             id: newState.guild.roles.everyone,
//             deny: [PermissionsBitField.Flags.ViewChannel],
//           },
//           {
//             id: newState.guild.roles.cache.get("984711293833478164"), // 부계
//             allow: [PermissionsBitField.Flags.ViewChannel]
//           },
//           {
//             id: newState.guild.roles.cache.get("1087251326171349092"), // 그레이
//             allow: [PermissionsBitField.Flags.ViewChannel]
//           },
//           {
//             id: newState.guild.roles.cache.get("952771282133463170"), // 레드
//             allow: [PermissionsBitField.Flags.ViewChannel]
//           },
//           {
//             id: newState.guild.roles.cache.get("937598204713775126"), // 오렌지
//             allow: [PermissionsBitField.Flags.ViewChannel]
//           },
//           {
//             id: newState.guild.roles.cache.get("970471835944775720"), // 옐로우
//             allow: [PermissionsBitField.Flags.ViewChannel]
//           },
//           {
//             id: newState.guild.roles.cache.get("970472217337020426"), // 그린
//             allow: [PermissionsBitField.Flags.ViewChannel]
//           },
//           {
//             id: newState.guild.roles.cache.get("970472530903191653"), // 블루
//             allow: [PermissionsBitField.Flags.ViewChannel]
//           },
//           {
//             id: newState.guild.roles.cache.get("1013129724282818600"), // 퍼플
//             allow: [PermissionsBitField.Flags.ViewChannel]
//           },
//         ],
//       });

//       await newState.member.voice.setChannel(voiceChannel);

//       client.createdVoiceChannels.set(voiceChannel.id, voiceChannel);
//     }

//     if (oldState.channelId && oldState.channel.members.size === 0 && oldState.channelId !== joinChannelId) {
//       const voiceChannel = await oldState.guild.channels.fetch(oldState.channelId).catch(console.error);
//       if (voiceChannel && voiceChannel.members.size === 0) {

//         await voiceChannel.delete().catch(console.error);

//         client.createdVoiceChannels.delete(voiceChannel.id);
//       }
//     }
//   }
// }
