const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder } = require('discord.js');
const fs = require('fs');
const Embeds = require('../../class/embeds');
const User = require('../../schemas/user');

const PRICE = 1000;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("출석체크")
        .setDescription('출석 체크를 하여 보상을 받습니다.'),
    async execute(interaction, client) {
        const embeds = new Embeds();

        const storedUser = await client.fetchUser(interaction.user.id, interaction.guild.id);

        if (!storedUser){
            return interaction.reply({embeds: [embeds.economyError()]});
        }

        const today = new Date();
        if ((storedUser.attendance.getDay() !== today.getDay()) || (storedUser.attendance.getMonth() !== today.getMonth()) || (storedUser.attendance.getYear() !== today.getYear())) {
            await User.findOneAndUpdate(
                { _id: storedUser._id },
                { 
                    balance: storedUser.balance + PRICE,
                    attendance: today
                },
            );
            return interaction.reply({ 
                embeds: [embeds.attendanceSuccess(PRICE)] });
        } else {
            return interaction.reply({ 
                embeds: [embeds.attendanceError()] });
        }
    }
}