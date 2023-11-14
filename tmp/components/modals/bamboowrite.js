const { SlashCommandBuilder, StringSelectMenuBuilder, EmbedBuilder, ActionRowBuilder, ChannelType } = require('discord.js');
const fs = require('fs');
const Embeds = require('../../class/embeds');
const Buttons = require('../../class/buttons');

module.exports = {
    data: {
        name: 'bamboowriteModal'
    },

    async execute(interaction, client) {

        const buttons = new Buttons();

        const writeAcceptButton = buttons.writeAcceptDenyButton('writeaccept')
        const writeDenyButton = buttons.writeAcceptDenyButton('writedeny')

        const row = new ActionRowBuilder().addComponents(writeAcceptButton, writeDenyButton)

        const channelId = "1097982288198910073"
        const writeDataTitle = interaction.fields.getTextInputValue('writeTitleInput')
        const writeDataCompartment = interaction.fields.getTextInputValue('writeCompartmentInput')

        const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle(`${writeDataTitle}`)
            .setDescription(`${writeDataCompartment}`)
        client.channels.cache.get(channelId).send({ content: `<@&937597272122884107> <@&937600283708629003>`, embeds: [embed], components: [row] })
        await interaction.reply({ embeds: [
            new EmbedBuilder()
                .setDescription("글이 검열 되고 있습니다...")], 
            ephemeral: true})
    }
}