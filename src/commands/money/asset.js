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
    
    async execute(interaction, client) {
        const embeds = new Embeds();
        let target;
        !interaction.options.getUser('대상') ? target = interaction.user : target = interaction.options.getUser('대상');
        
        const storedUser = await client.fetchUser(interaction.user.id, interaction.guild.id);
        const storedUserRank = await client.getRank(target.id, interaction.guild.id);
        return interaction.reply({ embeds: [embeds.assetCheckSuccess(storedUser.userId, storedUser.balance, storedUserRank.rank)] });

    }
}