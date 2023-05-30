module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        let welcomeRole = member.guild.roles.cache.find(role => role.name === '🚩승인필요');
        let welcomeRole2 = member.guild.roles.cache.find(role => role.name === '------------------<  소개  >------------------');
        member.roles.add(welcomeRole)
        member.roles.add(welcomeRole2)
    
        const embed = {
            title: '🖌️ PALETTE 🎨\n\n- 승인 절차 -',
            description: `👏🏻✨ <@${member.user.id}> 님, ***𓇼 PALETTE 𓇼***에 오신 것을 환영합니다!! ✨👏🏻\n\n저희 서버는 2주간의 시간동안의 활동을 기반으로 멤버 투표로 승인을 결정합니다. 괜찮으시다면 아래와 같이 기입해주세요.\n\n사용하실 닉넴 / 태어나신 년도 / 성별 / 거주하는 나라 / 들어온 경로를 적어주시고 <@&${"937600283708629003"}>를 맨션해주세요.\n\n지인 초대로 들어오신거면 지인분 이름 써주세요\n\n👉 예: 닉넴 / 98 / 남 / 미국 / 디스보드\n닉넴 / 02 / 여 / 캐나다 / 지인닉넴`,
        };

        const channel = member.guild.channels.cache.get('948673619184209950'); // Welcome channel ID
    
        if (channel) {
            return await channel.send({embeds: [embed]})
        }
    }
}