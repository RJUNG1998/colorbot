const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const Embeds = require('../../class/embeds');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("송금")
        .setDescription("특정 유저에게 돈을 송금합니다.")
        .addUserOption(option => 
            option.setName("대상")
                .setDescription("송금할 대상을 입력해주세요.")
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName("금액")
                .setDescription('송금할 금액을 입력해주세요.')
                .setRequired(true)),

    async execute(interaction) {
        const embeds = new Embeds();
        const user = interaction.user;
        const target = interaction.options.getUser('대상');
        const amount = interaction.options.getInteger('금액');

        const userFilePath = `./data/user/${user.id}.json`;
        const targetFilePath = `./data/user/${target.id}.json`;

        let userData, targetData;

        if (fs.existsSync(userFilePath)){
            userData = JSON.parse(fs.readFileSync(userFilePath, "utf-8"));
        } else {
            return interaction.reply({embeds: [embeds.economyError()]});
        }

        if (fs.existsSync(targetFilePath)) {
            targetData = JSON.parse(fs.readFileSync(targetFilePath, "utf-8"));
        } else {
            return interaction.reply({ embeds: [embeds.targetEconomyError()] });
        }

        if (userData.ongame || targetData.ongame) {
            return interaction.reply({ embeds: [embeds.bothPlayerOnGame()] });
        }

        if (userData.money >= amount) {
            userData.money -= amount;
            targetData.money += amount;

            fs.writeFileSync(userFilePath, JSON.stringify(userData));
            fs.writeFileSync(targetFilePath, JSON.stringify(targetData));

            return interaction.reply({ embeds: [embeds.sendMoneySuccess(targetData.id, amount)] });
        } else {
            return interaction.reply({ embeds: [embeds.sendMoneyFail()] });
        }
    }
}