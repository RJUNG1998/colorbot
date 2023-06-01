const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder } = require('discord.js');
const fs = require('fs');
const Embeds = require('../../class/embeds');
const User = require('../../schemas/user');

const PRICE = 1000;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("커스터마이징")
        .setDescription("유저의 랭크카드를 커스터마이징 합니다.")
        .addStringOption(option => 
            option.setName("아이템")
                .setDescription("바꾸고 싶은 아이템 종류를 선택합니다.")
                .addChoices(
                    { name: "백그라운드", value: 'background' },
                )
                .setRequired(true))
        .addStringOption(option =>
            option.setName("이름")
                .setDescription("해당 아이템 바꾸길 희망하는 아이템을 적어주세요.")
            ),
    async execute(interaction, client) {
        const storedUser = await client.fetchUser(interaction.user.id, interaction.guild.id);
        const action = interaction.options.getString("장식");

        switch (action) {
            case "background":

                break;
            default:
                break;
        }
        
        await interaction.reply({content: `${storedUser.profileSource.backgroundInventory}`});
    }
}