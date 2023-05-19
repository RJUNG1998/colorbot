const { SlashCommandBuilder, ComponentType, StringSelectMenuBuilder, EmbedBuilder, ActionRowBuilder, ChannelType } = require('discord.js');
const fs = require('fs');
const Embeds = require('../../class/embeds');
const Buttons = require('../../class/buttons');

module.exports = {
    data: {
        name: 'registerModal'
    },

    async execute(interaction, client) {

        const button = new Buttons()
        const Top = button.inhouseLane('inhouseTop')
        const subTop = button.inhouseLane('inhouseSubTop')
        const Jgl = button.inhouseLane('inhouseJgl')
        const subJgl = button.inhouseLane('inhouseSubJgl')
        const Mid = button.inhouseLane('inhouseMid')
        const subMid = button.inhouseLane('inhouseSubMid')
        const Adc = button.inhouseLane('inhouseAdc')
        const subAdc = button.inhouseLane('inhouseSubAdc')
        const Sup = button.inhouseLane('inhouseSup')
        const subSup = button.inhouseLane('inhouseSubSup')
        const complete = button.inhouseButton('inhouseFinish')
        const reject = button.inhouseButton('inhouseReject')
        const rift = button.inhouseButton('inhouseRift')
        const aram = button.inhouseButton('inhouseAram')
        const Valorant = button.inhouseButton('inhouseValorant')

        const row0 = new ActionRowBuilder().addComponents(rift, aram, Valorant)
        const row1 = new ActionRowBuilder().addComponents(Top,Jgl,Mid,Adc,Sup)
        const row2 = new ActionRowBuilder().addComponents(subTop,subJgl,subMid,subAdc,subSup)
        const row3 = new ActionRowBuilder().addComponents(complete, reject)

        const channelId = '1108950964045627392'
        const dataDesire = interaction.fields.getTextInputValue('desireInput')
        const dataTag = interaction.fields.getTextInputValue('tagInput')
        const dataIgn = interaction.fields.getTextInputValue('ignInput')

        const userId = interaction.user.id

        const message = await client.channels.cache.get(channelId).send({ embeds: [
            new EmbedBuilder()
                .setColor('Green')
                .setTitle('등록 요청')
                .setDescription(`${interaction.user}`)
                .addFields(
                    { name: "`종류`", value: `*${dataDesire}*`},
                    { name: "`태그`", value: `*${dataTag}*`, inline: true },
                    { name: "`오피지지`", value: `[링크](${dataIgn})`, inline: true}
                )
                .setFooter({ text: `${userId}` })], components: [row0, row1, row2, row3]
            })

        interaction.reply({ embeds: [
            new EmbedBuilder()
                .setTitle("요청 완료")
                .setDescription("이 작업은 다소 시간이 걸릴 수 있으며,\n결과는 DM으로 전달될 예정입니다.")],
            ephemeral: true})

        let roleMap = new Map([
            ['inhouseRift', '993627158138327151'],
            ['inhouseAram', '993626949471699067'],
            ['inhouseValorant', '1097697913859223622'],

            ['inhouseTop', '1104903817214054502'],
            ['inhouseJgl', '1104903977499377675'],
            ['inhouseMid', '1104904044188795012'],
            ['inhouseAdc', '1104904049360384061'],
            ['inhouseSup', '1104904052912947300'],

            ['inhouseSubTop', '1104909779022917702'],
            ['inhouseSubJgl', '1104909845179682826'],
            ['inhouseSubMid', '1104909848015011960'],
            ['inhouseSubAdc', '1104909850372231199'],
            ['inhouseSubSup', '1104909856806277132'],
        ]);

        const guild = client.guilds.cache.get('937556248847581244')
        const collector = message.createMessageComponentCollector({ componentType: ComponentType.Button })
        collector.on('collect', async i => {
            if (roleMap.has(i.customId)) {
                const role = roleMap.get(i.customId)
                if (guild.members.cache.get(userId).roles.cache.has(role)) {
                    guild.members.cache.get(userId).roles.remove(role)
                    i.reply({ content: `<@${userId}>님에게서 <@&${role}> 역할을 삭제했습니다`, ephemeral: true })
                } else {
                    guild.members.cache.get(userId).roles.add(role)
                    i.reply({ content: `<@${userId}>님에게 <@&${role}> 역할을 지급했습니다`, ephemeral: true })
                }
            } else if (i.customId === 'inhouseFinish') {
                await client.users.cache.get(userId).send({ embeds: [new EmbedBuilder().setColor('Green').setTitle('수락').setDescription('정상적으로 등록이 완료되었습니다!')] })
                i.update({ content: `<@${i.user.id}>님이 승낙!`, components: [] })
            } else if (i.customId === 'inhouseReject') {
                await client.users.cache.get(userId).send({ embeds: [new EmbedBuilder().setColor('Red').setTitle('거부').setDescription('opgg 링크를 다시 확인해 주세요.')] })
                i.update({ content: `<@${i.user.id}>님이 거부!`, components: [] })
            }
        })
    }
}