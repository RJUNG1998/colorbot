const { EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: {
        name: 'postwritemodal'
    },

    async execute(interaction, client) {
        const channelId = "1097982288198910073"
                const dataTitle = interaction.fields.getTextInputValue('titleinput');
                const dataCompartment = interaction.fields.getTextInputValue('compartmentinput');

                client.channels.cache.get(channelId).send({ embeds: [
                    new EmbedBuilder()
                        .setColor("Blue")
                        .setTitle(`${dataTitle}`)
                        .setDescription(`${dataCompartment}`)
                        .setFooter({ text: `by ${interaction.member.nickname} | ${interaction.user.tag}` })        
                ]})

                interaction.reply({ embeds: [
                    new EmbedBuilder()
                        .setDescription("글이 정상적으로 수위 검열에 들어갔습니다!")], 
                    ephemeral: true});
    }
}