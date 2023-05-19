const { SlashCommandBuilder, ComponentType, StringSelectMenuBuilder, EmbedBuilder, ActionRowBuilder, ChannelType, Collector } = require('discord.js');
const fs = require('fs');
const Embeds = require('../../class/embeds');
const Buttons = require('../../class/buttons');

module.exports = {
    data: {
        name: `inhouseAddModal`
    },

    async execute(interaction, client) {

        const button = new Buttons()
        const subTop = button.inhouseLane('inhouseSubTop')
        const subJgl = button.inhouseLane('inhouseSubJgl')
        const subMid = button.inhouseLane('inhouseSubMid')
        const subAdc = button.inhouseLane('inhouseSubAdc')
        const subSup = button.inhouseLane('inhouseSubSup')
        const complete = button.inhouseButton('inhouseFinish')
        const reject = button.inhouseButton('inhouseReject')

        const row0 = new ActionRowBuilder().addComponents(subTop, subJgl, subMid, subAdc, subSup)
        const row1 = new ActionRowBuilder().addComponents(complete, reject)

        const userId = interaction.user.id
        const channelId = '1108950964045627392'
        
        const dataLane = interaction.fields.getTextInputValue('laneInput')
        const dataOpgg = interaction.fields.getTextInputValue('opggInput')

        const message = await client.channels.cache.get(channelId).send({ embeds: [
            new EmbedBuilder()
                .setColor('Yellow')
                .setTitle('라인 추가 요청')
                .setDescription(`${interaction.user}`)
                .addFields(
                    { name: "`라인`", value: `*${dataLane}*`},
                    { name: "`오피지지`", value: `[링크](${dataOpgg})`},
                )
                .setFooter({ text: `${interaction.user.id}`, components: [row0, row1] })], components: [row0, row1] 
            })

        interaction.reply({ embeds: [
            new EmbedBuilder()
                .setTitle("요청 완료")
                .setDescription("이 작업은 다소 시간이 걸릴 수 있으며,\n결과는 DM으로 전달될 예정입니다.")],
             ephemeral: true})

        let subRoleMap = new Map([
            ['inhouseSubTop', '1104909779022917702'],
            ['inhouseSubJgl', '1104909845179682826'],
            ['inhouseSubMid', '1104909848015011960'],
            ['inhouseSubAdc', '1104909850372231199'],
            ['inhouseSubSup', '1104909856806277132'],
        ])

        const guild = client.guilds.cache.get('937556248847581244')
        const collector = message.createMessageComponentCollector({ componentType: ComponentType.Button })
        collector.on('collect', async x => {
            if (subRoleMap.has(x.customId)) {
                const role = subRoleMap.get(x.customId)
                if (guild.members.cache.get(userId).roles.cache.has(role)) {
                    guild.members.cache.get(userId).roles.remove(role)
                    x.reply({ content: `<@${userId}>님에게서 <@&${role}> 역할을 삭제했습니다`, ephemeral: true })
                } else {
                    guild.members.cache.get(interaction.user.id).roles.add(role)
                    x.reply({ content: `<@${userId}>님에게 <@&${role}> 역할을 지급했습니다`, ephemeral: true })
                }
            } else if (x.customId === 'inhouseFinish') {
                await client.users.cache.get(userId).send({ embeds: [new EmbedBuilder().setColor('Green').setTitle('수락').setDescription('라인 요청이 승낙되었습니다!')] })
                x.update({ content: `<@${i.user.id}>님이 승낙`, components: [] })
            } else if (x.customId === 'inhouseReject') {
                await client.users.cache.get(userId).send({ embeds: [new EmbedBuilder().setColor('Red').setTitle('거부').setDescription('요청자님의 opgg 링크가 잘못되었거나\n요청 라인의 데이터가 불충분하다 판단되어\n요청이 거절당했습니다.')] })
                x.update({ content: `<@${i.user.id}>님이 거부`, components: [] })
            }
        })
    }
}