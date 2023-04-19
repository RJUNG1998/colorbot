const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder } = require('discord.js');
const fs = require('fs');
const Embeds = require('../../class/embeds');

const PRICE = 50000;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("출석체크")
        .setDescription('출석 체크를 하여 보상을 받습니다.'),
    async execute(interaction) {
        const embeds = new Embeds();
        const userDataFilePath = `./data/user/${interaction.user.id}.json`;

        let userData;

        if (fs.existsSync(userDataFilePath)) {
            userData = JSON.parse(fs.readFileSync(userDataFilePath, "utf-8"));
        } else {
            return interaction.reply({ 
                embeds: [embeds.economyError()] });
        }

        const today = new Date();
        const date = "" + today.getFullYear() + (today.getMonth() + 1) + today.getDate();

        if (userData.attendancecooldown === date) {
            return interaction.reply({ 
                embeds: [embeds.attendanceError()] });
        }

        userData.money = userData.money + PRICE;
        userData.attendancecooldown = date;

        fs.writeFileSync(userDataFilePath, JSON.stringify(userData));

        return interaction.reply({ 
            embeds: [embeds.attendanceSuccess(PRICE)] });
    }
}