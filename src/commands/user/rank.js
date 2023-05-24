const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder } = require('discord.js');
const fs = require('fs');
const Embeds = require('../../class/embeds');
const User = require('../../schemas/user');

const PRICE = 1000;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("랭크")
        .setDescription("유저의 랭크를 확인합니다."),
    async execute(interaction, client) {
        const storedUser = await client.fetchUser(
            interaction.user.id,
            interaction.guild.id
        );
        
        return await interaction.reply(`채팅레벨: ${await storedUser.exp.chatLevel}\n채팅경험치: ${await storedUser.exp.chat}\n보이스레벨: ${await storedUser.exp.voiceLevel}\n보이스경험치: ${await storedUser.exp.voice}`);
    } 
}