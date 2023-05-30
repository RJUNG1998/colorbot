const { Client, GatewayIntentBits, GuildMember } = require('discord.js');
//const Embeds = require('../../class/embeds');

const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
    ],
  });

client.on('guildMemberAdd', member => {
    let welcomeRole = member.guild.roles.cache.find(role => role.name === '🚩승인필요');
    let welcomeRole2 = member.guild.roles.cache.find(role => role.name === '------------------<  소개  >------------------');
  member.roles.add(welcomeRole)
  member.roles.add(welcomeRole2)

    .catch(console.error);
    

    const embed = {
        title: '🖌️ PALETTE 🎨 - 승인 절차 -',
        description: `👏🏻✨ ${member.user.username}, 𓇼 PALETTE 𓇼에 오신 것을 환영합니다!! ✨👏🏻\n\n저희 서버는 2주간의 시간동안의 활동을 기반으로 멤버 투표로 승인을 결정합니다. 괜찮으시다면 아래와 같이 기입해주세요.\n\n사용하실 닉넴 / 태어나신 년도 / 성별 / 거주하는 나라 / 들어온 경로를 적어주시고 @서버도우미를 맨션해주세요.\n\n지인 초대로 들어오신거면 지인분 이름 써주세요\n\n👉 예: 닉넴 / 98 / 남 / 미국 / 디스보드\n닉넴 / 02 / 여 / 캐나다 / 지인닉넴`,
    };

    const channel = member.guild.channels.cache.get('948673619184209950'); // Welcome channel ID
    
    if (channel) {
        channel.send({embeds: [embed]})
            .then(() => {
                console.log('메세지를 성공적으로 보냈습니다.');
            })
            .catch(error => {
                console.error('메세지를 보낼 수 없습니다.', error);
            });
        }
        
    
    }),

client.login('bot-token');
