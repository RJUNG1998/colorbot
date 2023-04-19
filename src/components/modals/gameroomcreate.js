const { SlashCommandBuilder, StringSelectMenuBuilder, EmbedBuilder, ActionRowBuilder, ChannelType } = require('discord.js');
const fs = require('fs');
const Embeds = require('../../class/embeds');
const Buttons = require('../../class/buttons');

module.exports = {
    data: {
        name: 'gameroomcreate'
    },
    async execute(interaction, client) {
        const embeds = new Embeds();
        const buttons = new Buttons();

        const gameroomData = JSON.parse(fs.readFileSync(`./data/gameroom/gameroom.json`, "utf-8"));
        const gameroomEmbed = await client.channels.cache.get(gameroomData.message.channelId).messages.fetch(gameroomData.message.id);
        
        const game = interaction.fields.getTextInputValue('game')
        const description = interaction.fields.getTextInputValue('description')
        const limit = interaction.fields.getTextInputValue('limit')

        const thread = await interaction.channel.threads.create({
            name: description,
            type: ChannelType.PrivateThread,
        })

        const threadButton = new ActionRowBuilder().addComponents(buttons.gameroomThreadLeave())

        thread.members.add(interaction.user.id);
        thread.send({ embeds: [embeds.gameroomThreadEmbed()], components: [threadButton] })
        gameroomData.data.push({name: game, description: description, limit: limit, owner: interaction.user.id})

        const dataCount = gameroomData.data.length;
        delete gameroomEmbed.embeds[0].data.description 
        if (dataCount > 1) {
            gameroomEmbed.embeds[0].data.fields.push({
                name: `${dataCount}. ${description}`, 
                value: `> 게임:${game}\n> 인원: ${limit}\n> 방장:<@${interaction.user.id}>`
            })
        } else {
            gameroomEmbed.embeds[0].data.fields = [
                {
                    name: `${dataCount}. ${description}`, 
                    value: `> 게임:${game}\n> 인원: ${limit}\n> 방장:<@${interaction.user.id}>`
                }
            ]
        }
        gameroomEmbed.edit({ embeds: [gameroomEmbed.embeds[0].data] });
        gameroomData['message'] = gameroomEmbed;

        const joinButton = buttons.gameroomJoinButton();
        const rowButton = new ActionRowBuilder().addComponents(joinButton)

        fs.writeFileSync(`./data/gameroom/gameroom.json`, JSON.stringify(gameroomData));
        await interaction.reply({ embeds: [embeds.gameroomCreateWaitingEmbed(description, limit, interaction.member.nickname)], components: [rowButton] });
    }
}