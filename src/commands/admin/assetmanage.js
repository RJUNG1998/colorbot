const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const User = require('../../schemas/user');
const priceAdjust = require('../../class/priceAdjust');
const Embeds = require('../../class/embeds');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("자산관리")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
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
    
    async execute(interaction, client) {
        const embeds = new Embeds();
        if (!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply("권한이 없습니다.");
        const target = interaction.options.getUser('대상');

        let storedUser = await client.fetchUser(target.id, interaction.guild.id);
        
        const amount = interaction.options.getInteger("값");
        const action = interaction.options.getString("동작");
        const oldAmount = storedUser.balance;

        console.log(amount)

        switch (action) {
            case "edit":
                await User.findOneAndUpdate(
                    { _id: storedUser._id },
                    { balance: amount }
                );
                break;
            case "plus":
                await User.findOneAndUpdate(
                    { _id: storedUser._id },
                    { balance: storedUser.balance + amount }
                );
                break;
            case "minus":
                await User.findOneAndUpdate(
                    { _id: storedUser._id },
                    { balance: storedUser.balance - amount }
                );
                break;
            default:
                break;
        }

        storedUser = await client.getUser(target.id, interaction.guild.id);

        return await interaction.reply({ embeds: [embeds.assetManageSuccess(target.id, oldAmount, storedUser.balance)] })
    }
}