module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        const introRole = "951197966641803315";
        const gameRole = "1021230808914206760";
        const customRole = "1105028550437904455";
        const hobbyRole = "951197274086723695";
        const warningRole = "1047622259155677364";
        const acceptRole = "937562805702393898";

        member.roles.add(introRole);
        member.roles.add(gameRole);
        member.roles.add(customRole);
        member.roles.add(hobbyRole);
        member.roles.add(warningRole);
        member.roles.add(acceptRole);
    
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