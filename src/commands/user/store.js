const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const fs = require('fs');
const Embeds = require('../../class/embeds');
const Item = require('../../schemas/item');
const priceAdjust = require('../../class/priceAdjust');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("상점")
        .setDescription('팔레트 서버의 상점을 확인합니다.')
        .addStringOption(option => 
            option.setName("종류")
                .setDescription("어떤 상점을 열것인지 선택해주세요.")
                .setRequired(true)
                .addChoices(
                    { name: "정보", value: "info" },
                )),
    async execute(interaction, client) {
        const storedUser = await client.fetchUser(interaction.user.id, interaction.guild.id);
        const storedStore = await client.getStore('info')
        const action = interaction.options.getString("종류");

        const menu = new StringSelectMenuBuilder()

        switch (action) {
            case 'info':
                menu.setCustomId('storeInfo')
                for (const [key, value] of Object.entries(storedStore.storeList.background)) {
                    menu.addOptions(new StringSelectMenuOptionBuilder()
                        .setLabel(`백그라운드`)
                        .setDescription(`${value.name}: ${priceAdjust.priceCommas(value.price)} 원`)
                        .setValue(`background ${key}`)
                    )
                }
                
                // storedUser.profileSource.achievementInventory.forEach(value => {
                //     menu.addOptions(new StringSelectMenuOptionBuilder()
                //         .setLabel(`칭호`)
                //         .setDescription(`${storedRankItem.itemList.achievement[value].name}`)
                //         .setValue(`achievement ${value}`)
                //     )
                // })
                break;
            case 'etc':
                break;
            default:
                break;
        }

        return await interaction.reply({ components: [new ActionRowBuilder().addComponents(menu)], ephemeral: true })
    }
}