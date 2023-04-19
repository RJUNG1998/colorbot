const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const priceAdjust = require('../../class/priceAdjust');
const Embeds = require('../../class/embeds');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("자산관리")
        .setDescription("(관리자용 명령어) 지정한 유저의 돈을 수정합니다.")
        .addUserOption(option => 
            option.setName("대상")
                .setDescription("돈을 수정할 유저를 지정해주세요")
                .setRequired(true))
        .addStringOption(option => 
            option.setName("동작")
                .setDescription("어떤 동작을 할것인지 선택해주세요.")
                .setRequired(true)
                .addChoices(
                    { name: "수정", value: "edit" },
                    { name: "지급", value: "plus" },
                    { name: "차감", value: "minus" }
                ))
        .addIntegerOption(option =>
            option.setName("값")
                .setDescription("값을 입력해주세요.")
                .setRequired(true)),
    
    async execute(interaction) {
        const embeds = new Embeds();
        if (!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply("권한이 없습니다.");
        const target = interaction.options.getUser('대상');

        const userDataFilePath = `./data/user/${target.id}.json`;
        let userData;
        if (fs.existsSync(userDataFilePath)) {
            userData = JSON.parse(fs.readFileSync(userDataFilePath, "utf-8"));
        } else {
            return interaction.reply({ embeds: [embeds.assetCheckError()] });
        }
        
        const amount = interaction.options.getInteger("값");
        const action = interaction.options.getString("동작");
        const oldAmount = userData.money;

        switch (action) {
            case "edit":
                userData.money = amount;
                break;
            case "plus":
                userData.money += amount;
                break;
            case "minus":
                userData.money -= amount;
                break;
            default:
                break;
        }

        fs.writeFileSync(userDataFilePath, JSON.stringify(userData));
        return interaction.reply({ embeds: [embeds.assetManageSuccess(userData.id, oldAmount, userData.money)] })
    }
}