const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const fs = require('fs');
const Embeds = require('../../class/embeds');
const Item = require('../../schemas/item');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("인벤토리")
        .setDescription('내 인벤토리를 체크합니다.')
        .addStringOption(option => 
            option.setName("종류")
                .setDescription("어떤 인벤토리를 열것인지 선택해주세요.")
                .setRequired(true)
                .addChoices(
                    { name: "정보", value: "info" },
                )),
    async execute(interaction, client) {
        const storedUser = await client.fetchUser(interaction.user.id, interaction.guild.id);
        const storedRankItem = await client.getItems('info')
        const action = interaction.options.getString("종류");

        const menu = new StringSelectMenuBuilder()

        switch (action) {
            case 'info':
                menu.setCustomId('inventoryInfo')
                storedUser.profileSource.backgroundInventory.forEach(value => {
                    menu.addOptions(new StringSelectMenuOptionBuilder()
                        .setLabel(`백그라운드`)
                        .setDescription(`${storedRankItem.itemList.background[value].name}`)
                        .setValue(`background ${value}`)
                    )
                })
                storedUser.profileSource.achievementInventory.forEach(value => {
                    // console.log(storedRankItem.itemList.achievement[value])
                    menu.addOptions(new StringSelectMenuOptionBuilder()
                        .setLabel(`칭호`)
                        .setDescription(`${storedRankItem.itemList.achievement[value].name}`)
                        .setValue(`achievement ${value}`)
                    )
                })
                break;
            case 'etc':
                break;
            default:
                break;
        }

        return await interaction.reply({ components: [new ActionRowBuilder().addComponents(menu)], ephemeral: true })
    }
}