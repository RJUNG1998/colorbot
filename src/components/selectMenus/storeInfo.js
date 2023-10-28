const { SlashCommandBuilder, StringSelectMenuBuilder, EmbedBuilder, ActionRowBuilder, ChannelType } = require('discord.js');
const fs = require('fs');
const Embeds = require('../../class/embeds');
const Buttons = require('../../class/buttons');
const User = require('../../schemas/user');

module.exports = {
    data: {
        name: 'storeInfo'
    },
    async execute(interaction, client) {

        const embeds = new Embeds()

        const storedUser = await client.fetchUser(interaction.user.id, interaction.guild.id);
        const storedStore = await client.getStore('info');
        const type = interaction.values[0].split(' ')[0]
        switch (type){
            case "background":
                if (storedStore.storeList.background[interaction.values[0].split(' ')[1]].price > storedUser.balance) {
                    return await interaction.reply({ embeds: [embeds.sendMoneyFail()], ephemeral: true })
                } else if (storedUser.profileSource.backgroundInventory.includes(interaction.values[0].split(' ')[1])){
                    return await interaction.reply({ embeds: [embeds.alreadyOwnedEmbed()], ephemeral: true })
                } else {
                    const tmp = storedUser.profileSource.backgroundInventory;
                    tmp.push(interaction.values[0].split(' ')[1])
                    await User.findOneAndUpdate(
                        { _id: storedUser._id },
                        { 
                            'profileSource.background': interaction.values[0].split(' ')[1],
                            'profileSource.backgroundInventory': tmp,
                            balance: storedUser.balance - storedStore.storeList.background[interaction.values[0].split(' ')[1]].price
                        }
                    );
                    return await interaction.reply({ embeds: [embeds.purchaseSuccessfulEmbed()], ephemeral: true })
                }
                break;
            case "achievement":
                // await User.findOneAndUpdate(
                //     { _id: storedUser._id },
                //     { 'profileSource.achievement': interaction.values[0].split(' ')[1] }
                // );
                break;
            default:
                break;

        }
    }
}