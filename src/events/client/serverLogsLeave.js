const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: 'guildMemberRemove',
    async execute(member) {
        let channel = member.guild.channels.cache.get('937580187476959252')

        let currentDate = new Date()
        let hours = currentDate.getHours()
        let minutes = currentDate.getMinutes()

        let AMPM = hours >= 12 ? '오후' : '오전'
        let customHours = hours % 12 === 0 ? 12 : hours % 12

        let customDate = currentDate.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })

        let customTime = `${customHours}:${minutes.toString().padStart(2, '0')}`

        const embed = new EmbedBuilder()
            .setColor('Red')
            .setTitle('퇴장')
            .addFields(
                { name: '유저 ID', value: `${member.user.id}` },
                { name: '유저 태그', value: `${member.user.tag}` },
                { name: '퇴장일', value: `${customDate} ${AMPM} ${customTime}`}
            )
        
        channel.send({ embeds: [embed] })
    }
}