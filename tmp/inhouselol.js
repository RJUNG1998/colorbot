const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const Embeds = require('../src/class/embeds');

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
                            { name: '탑', value: 'top' },
                            { name: '정글', value: 'jungle' },
                            { name: '미드', value: 'mid' },
                            { name: '원딜', value: 'adc' },
                            { name: '서폿', value: 'support' },
                            ))),

    async execute(interaction, client) {

        const channelId = '1105053838047715379'
        interaction.reply("hi")
        
    }
}