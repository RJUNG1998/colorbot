const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const User = require('../../schemas/user');
const priceAdjust = require('../../class/priceAdjust');
const Embeds = require('../../class/embeds');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("칭호")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDescription("(관리자용 명령어) 지정한 유저의 칭호를 관리합니다.")
        .addUserOption(option => 
            option.setName("대상")
                .setDescription("칭호를 관리할 유저를 지정해주세요")
                .setRequired(true))
        .addStringOption(option => 
            option.setName("동작")
                .setDescription("어떤 동작을 할것인지 선택해주세요.")
                .setRequired(true)
                .addChoices(
                    { name: "추가", value: "add" },
                    { name: "삭제", value: "delete" },
                ))
        .addStringOption(option =>
            option.setName("이름")
                .setDescription("칭호의 이름을 적어주세요 (양식에 맞게).")
                .setRequired(true)),
    
    async execute(interaction, client) {
        const embeds = new Embeds()

        if (!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({ embeds: [embeds.noPermissionEmbed()], ephemeral: true });
        const target = interaction.options.getUser('대상');
        const name = interaction.options.getString("이름");
        const action = interaction.options.getString("동작");
        const storedItems = await client.getItems('info');
        const storedUser = await client.fetchUser(target.id, interaction.guild.id);

        if (storedItems.itemList.achievement[name] === undefined) {
            return await interaction.reply({ embeds: [embeds.noTitleExist()], ephemeral: true })
        }

        switch (action) {
            case "add":
                if (storedUser.profileSource.achievementInventory.includes(name)) {
                    return await interaction.reply({ embeds: [embeds.yesTitleExist()], ephemeral: true })
                } else {
                    const tmp = storedUser.profileSource.achievementInventory;
                    tmp.push(name)
                    await User.findOneAndUpdate(
                        { _id: storedUser._id },
                        { 'profileSource.achievementInventory': tmp }
                    );
                }
                break;
            case "delete":
                if (!storedUser.profileSource.achievementInventory.includes(name)) {
                    return await interaction.reply({ embeds: [embeds.noTitleDelete()], ephemeral: true })
                } else {
                    let tmp = storedUser.profileSource.achievementInventory;
                    tmp = tmp.filter(i => {
                        return i !== name;
                    })
                    await User.findOneAndUpdate(
                        { _id: storedUser._id },
                        { 
                            'profileSource.achievementInventory': tmp, 
                            'profileSource.achievement': "beginner",
                        }
                    );
                }
                break;
            default:
                break;
        }
        return await interaction.reply({ embeds: [embeds.changedSuccessfulEmbed()], ephemeral: true })
    }
}