const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const Embeds = require('../../class/embeds');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('가입')
        .setDescription('팔레트 경제 시스템에 가입합니다.'),
    async execute(interaction) {
        const embeds = new Embeds();
        const id = interaction.user.id;
        const name = interaction.user.username;
        const filePath = `./data/user/${id}.json`;
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, JSON.stringify(
                { 
                    id,
                    name, 
                    money: 0,  
                    stock: [], 
                    inventory: {},
                    attendancecooldown: "", 
                    workcooldown: 0,
                    stealcooldown: 0,
                    level: 1,
                    voicelevel: 1,
                    messagelevel: 1,
                    voicexp: 0,
                    messagexp: 0,
                    ongame: false 
                }
            ));
            return interaction.reply({ embeds: [embeds.registerSuccess()] }); 
        } else {
            return interaction.reply({ embeds: [embeds.registerFail()] });
        }
    }
}