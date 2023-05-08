const { SlashCommandBuilder, ActionRowBuilder } = require('discord.js');
const priceAdjust = require('../../class/priceAdjust');
const Embeds = require('../../class/embeds');
const Buttons = require('../../class/buttons');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('자산순위')
        .setDescription('자산 순위를 출력합니다.'),
    async execute(interaction, client) {
        const embeds = new Embeds();
        const buttons = new Buttons();

        const storedUser = await client.fetchUser(interaction.user.id, interaction.guild.id);

        let fields = [];
        const previousButton = buttons.previousButton();
        const nextButton = buttons.nextButton();
        const rowButton = new ActionRowBuilder().addComponents(previousButton, nextButton);

        const storedRank = await client.getAllRank(interaction.guild.id);

        for (var i = 0; i < storedRank.length; i++) {
            fields.push({ name: `${storedRank[i].rank} 위`, value: `<@${storedRank[i].userId}> 님: \`${priceAdjust.priceCommas(storedRank[i].balance)}\`\원` });
        }
        let maxPage = Math.round(fields.length / 10)
        let page = 1;

        if (maxPage < 2) {
            nextButton.setDisabled(true);
        }

        const rankingEmbed = embeds.ranking();
        rankingEmbed.addFields(fields.slice(0,10));

        const msg = await interaction.reply({ 
            embeds: [rankingEmbed], components: [rowButton] });

        const collector = msg.createMessageComponentCollector();
        collector.on('collect', async i => {
            switch (i.customId) {
                case "previous":
                    page -= 1;
                    break;
                
                case "next":
                    page += 1;
                    break;

                default:
                    break;
            }
            if (page > 1) {
                previousButton.setDisabled(false);
            } else if (page <= 1) {
                previousButton.setDisabled(true);
            }
            if (maxPage <= page) {
                nextButton.setDisabled(true);
            } else if (maxPage > page) {
                nextButton.setDisabled(false);
            }
            const fieldX = (page-1)*10
            const fieldY = (page)*10
            rankingEmbed.setFields(fields.slice(fieldX, fieldY))

            await i.update({ embeds: [rankingEmbed], components: [rowButton] });
        });
    }
}