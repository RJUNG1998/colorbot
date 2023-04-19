const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const Embeds = require('../../class/embeds');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("자산")
        .setDescription('자신이나 지정한 유저의 잔액을 확인합니다.')
        .addUserOption(option =>
            option.setName("대상")
                .setDescription('잔액을 확인할 유저를 지정해주세요. (지정하지 않으면 자신의 잔액을 확인합니다.)')
                .setRequired(false)),
    
    async execute(interaction) {
        const embeds = new Embeds();
        let target;
        !interaction.options.getUser('대상') ? target = interaction.user : target = interaction.options.getUser('대상');
        const targetFilePath = `./data/user/${target.id}.json`;
        
        let targetData, targetRank;
        let userDatas = [];

        if (fs.existsSync(targetFilePath)) {
            targetData = JSON.parse(fs.readFileSync(targetFilePath, "utf-8"));
        } else {
            return interaction.reply({ embeds: [embeds.assetCheckError()] });
        }

        const filePath = fs.readdirSync('./data/user').filter(file => file.endsWith('.json'));
        for (const file of filePath) {
            const data = JSON.parse(fs.readFileSync(`./data/user/${file}`, "utf-8"));
            userDatas.push({ id: data.id, money: data.money });
        }
        userDatas.sort(function (a, b) {
            return b.money - a.money;
        });
        for (var i = 0; i < userDatas.length; i++) {
            if (userDatas[i].id === targetData.id) {
                targetRank = i + 1;
                break;
            }
        }

        return interaction.reply({ embeds: [embeds.assetCheckSuccess(targetData.id, targetData.money, targetRank)] });
    }
}