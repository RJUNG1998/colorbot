const { SlashCommandBuilder, ActionRowBuilder } = require('discord.js');
const fs = require('fs');
const Embeds = require('../../class/embeds');
const Buttons = require('../../class/buttons');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("게임대기실")
        .setDescription("(관리자용 명령어) 게임대기실 채널을 설정합니다.")
        .addChannelOption(option =>
            option.setName("채널")
                .setDescription("채널을 지정해주세요.")
                .setRequired(true)),

    async execute(interaction) {
        const embeds = new Embeds();
        const buttons = new Buttons();
        if (!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply("권한이 없습니다.");
        const gameroomData = JSON.parse(fs.readFileSync(`./data/gameroom/gameroom.json`, "utf-8"));
        const channel = interaction.options.getChannel("채널");
        const row = new ActionRowBuilder().addComponents(buttons.gameroomCreateButton())
 
        interaction.reply({ embeds: [embeds.gameroomAdminChannel()] });
        const gameroomEmbed = await channel.send({ embeds: [embeds.gameroomEmbed()], components: [row] });
        gameroomData.message = gameroomEmbed;
        gameroomData['data'] = [];
        fs.writeFileSync(`./data/gameroom/gameroom.json`, JSON.stringify(gameroomData));
        return 
    }
}