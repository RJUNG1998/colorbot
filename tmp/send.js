const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const Embeds = require('../../class/embeds');
const User = require('../../schemas/user');

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
                .setRequired(true)
                .setMinValue(1)),

    async execute(interaction, client) {
        const embeds = new Embeds();
        const target = interaction.options.getUser('대상');
        const amount = interaction.options.getInteger('금액');

        const storedUser = await client.fetchUser(interaction.user.id, interaction.guild.id);
        const storedTargetUser = await client.fetchUser(target.id, interaction.guild.id);
    
        if (storedUser.balance >= amount) {
            await User.findOneAndUpdate(
                { _id: storedUser._id },
                { balance: await storedUser.balance - amount }
            );
            await User.findOneAndUpdate(
                { _id: storedTargetUser._id },
                { balance: await storedTargetUser.balance + amount }
            );

            return interaction.reply({ embeds: [embeds.sendMoneySuccess(storedTargetUser.userId, amount)] });
        } else {
            return interaction.reply({ embeds: [embeds.sendMoneyFail()] });
        }
    }
}