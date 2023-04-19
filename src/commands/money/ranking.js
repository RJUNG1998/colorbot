const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder } = require('discord.js');
const fs = require('fs');
const priceAdjust = require('../../class/priceAdjust');
const Embeds = require('../../class/embeds');
const Buttons = require('../../class/buttons');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('자산순위')
        .setDescription('자산 순위를 출력합니다.'),
    async execute(interaction) {
        const embeds = new Embeds();
        const buttons = new Buttons();

        let fields = [];
        let field = [];
        const previousButton = buttons.previousButton();
        const nextButton = buttons.nextButton();
        const rowButton = new ActionRowBuilder().addComponents(previousButton, nextButton);

        const filePath = fs.readdirSync('./data/user').filter(file => file.endsWith('.json'));
        for (const file of filePath) {
            const data = JSON.parse(fs.readFileSync(`./data/user/${file}`, "utf-8"));
            field.push({ id: data.id, money: data.money });
        }

        field.sort(function (a, b) {
            return b.money - a.money;
        });
        for (var i = 0; i < field.length; i++) {
            fields.push({ name: `${i + 1} 위`, value: `<@${field[i].id}> 님: \`${priceAdjust.priceCommas(field[i].money)}\`\원` });
        }
        let maxPage = Math.round(field.length / 10)
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