const { SlashCommandBuilder, StringSelectMenuBuilder, EmbedBuilder, ActionRowBuilder, ChannelType } = require('discord.js');
const fs = require('fs');
const Embeds = require('../../class/embeds');
const Buttons = require('../../class/buttons');
const User = require('../../schemas/user');

module.exports = {
    data: {
        name: 'inventory'
    },
    async execute(interaction, client) {
        if (interaction.message.interaction.user.id !== interaction.user.id) {
            await interaction.reply("자기꺼만 쓰세연 예?")
        } else {
            const storedUser = await client.fetchUser(interaction.user.id, interaction.guild.id);
            const type = interaction.values[0].split(' ')[0]
            switch (type){
                case "background":
                    await User.findOneAndUpdate(
                        { _id: storedUser._id },
                        { 'profileSource.background': interaction.values[0].split(' ')[1] }
                    );
                    break;
                case "achievement":
                    break;
                case "hiddenitem":
                    break;
                default:
                    break;
            }
            await interaction.reply({ content: "성공적으로 바꼈습니다.", ephemeral: true })
        }
    }
}