const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('내전')
        .setDescription('내전 관련 명령어를 불러옵니다')
        .addSubcommand(subcommand =>
            subcommand
                .setName('롤등록')
                .setDescription('롤 내전 등록을 요청합니다.')
                .addStringOption(option => 
                    option.setName('닉네임')
                        .setDescription('롤 닉네임을 적어주세요.')
                        .setRequired(true)))
        .addSubcommand(subcommand => 
            subcommand
                .setName('발로등록')
                .setDescription('발로란트 내전 등록을 요청합니다.')
                .addStringOption(option => 
                    option.setName('태그')
                        .setDescription('라이엇 ID와 태그를 적어주세요.')
                        .setRequired(true)))
        .addSubcommand(subcommand => 
            subcommand
                .setName('라인추가')
                .setDescription('서브 라인을 등록을 요청합니다.')
                .addStringOption(option => 
                    option.setName('라인')
                        .setDescription('추가 등록을 희망하는 라인을 선택하세요.')
                        .setRequired(true)
                        .addChoices(
                            { name: '탑', value: '탑' },
                            { name: '정글', value: '정글' },
                            { name: '미드', value: '미드' },
                            { name: '원딜', value: '원딜' },
                            { name: '서폿', value: '서폿' },
                            ))),

    async execute(interaction, client) {

        const channel = client.channels.cache.get("1105053838047715379")

        const nickname = interaction.options.getString('닉네임')
        const tag = interaction.options.getString('태그')
        const lane = interaction.options.getString('라인')

        if (interaction.options.getSubcommand() === '롤등록') {
            await channel.send("<@&1096143706068897862>")
            await channel.send({ embeds: [new EmbedBuilder().setColor('Yellow').setTitle("롤 내전 등록 요청").addFields({ name: '닉네임', value: `${nickname}` }).setFooter({ text: `${interaction.member.nickname} | ${interaction.user.tag}`})]})
            interaction.reply({ content: "등록중입니다... 잠시만 기다려주세요", ephemeral: true })
        } else if (interaction.options.getSubcommand() === '발로등록') {
            await channel.send("<@&1096143706068897862>")
            await channel.send({ embeds: [new EmbedBuilder().setColor('Orange').setTitle("발로란트 내전 등록 요청").addFields({ name: '라이엇ID & 태그', value: `${tag}` }).setFooter({ text: `${interaction.member.nickname} | ${interaction.user.tag}`})]})
            interaction.reply({ content: "등록중입니다... 잠시만 기다려주세요", ephemeral: true })
        } else if (interaction.options.getSubcommand() === '라인추가') {
            await channel.send("<@&1096143706068897862>")
            await channel.send({ embeds: [new EmbedBuilder().setColor('Blue').setTitle("롤 라인 추가 요청").addFields({ name: '유저 닉네임', value: `${interaction.member.nickname} | ${interaction.user.tag}`, inline: true }, { name: '희망 라인', value: `${lane}`, inline: true })]})
            interaction.reply({ content: "등록중입니다... 잠시만 기다려주세요", ephemeral: true })
        }
    }
}