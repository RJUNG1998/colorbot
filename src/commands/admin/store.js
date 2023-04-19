const { ActionRowBuilder, Events, StringSelectMenuBuilder, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const priceAdjust = require('../../class/priceAdjust');
const Embeds = require('../../class/embeds');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("상점")
        .setDescription("(관리자용 명령어) 상점 관련 설정입니다.")
        .addSubcommand(option =>
            option.setName("품목추가")
                .setDescription("상점에 품목을 추가합니다.")
                .addStringOption(option => 
                    option.setName("이름")
                        .setDescription("품목의 이름을 적어주세요.")
                        .setRequired(true))
                .addStringOption(option => 
                    option.setName("설명")
                        .setDescription("품목의 설명을 적어주세요.")
                        .setRequired(true))
                .addStringOption(option => 
                    option.setName("가격")
                        .setDescription("품목의 가격을 적어주세요.")
                        .setRequired(true)))
        .addSubcommand(option => 
            option.setName("품목삭제")
                .setDescription("상점에서 품목을 제거합니다.")
                .addStringOption(option =>
                    option.setName("품목")
                        .setDescription("삭제할 품목을 선택해주세요.")
                        .setRequired(true)))
        .addSubcommand(option => 
            option.setName("채널지정")
                .setDescription("상점 채널을 지정합니다.")
                .addChannelOption(option =>
                    option.setName("상점채널")
                        .setDescription("상점 채널을 선택해주세요.")
                        .setRequired(true))
                .addChannelOption(option =>
                    option.setName("관리채널")
                        .setDescription("상점 관리 채널을 선택해주세요.")
                        .setRequired(true)))
        .addSubcommand(option => 
            option.setName("재고추가")
                .setDescription("상점에 재고를 추가합니다.")
                .addStringOption(option =>
                    option.setName("품목")
                        .setDescription("추가할 품목을 입력해주세요.")
                        .setRequired(true))
                .addIntegerOption(option =>
                    option.setName("갯수")
                        .setDescription("추가할 품목의 갯수를 입력해주세요.")
                        .setRequired(true))),

    async execute(interaction, client) {
        function display() {
            const storeData = JSON.parse(fs.readFileSync(`./data/store/store.json`, "utf-8"));
            const newChannel = client.channels.cache.get(storeData.storeChannel);
            
            newChannel.bulkDelete(1);
            const itemExist = storeData.items.length > 0 ? true : false;

            const embed = new EmbedBuilder()
                .setTitle("자판기")
                .setDescription(itemExist ? "아래 메뉴에서 구매를 원하는 상품을 선택해주세요." : "현재 판매중인 상품이 없습니다.")
                .setColor("Blue");

            const select_menu = new StringSelectMenuBuilder()
                .setCustomId('storemenu')
                .setPlaceholder("상품 선택")
                .setMinValues(1)
                .setMaxValues(1);
            const menu = [];

            for (var i = 0; i < storeData.items.length; i++) {
                const item = storeData.items[i];
                menu.push({ label: `${item.name} ㆍ ${priceAdjust.priceCommas(item.price)}원 ㆍ 재고: ${item.quantity}개`, description: item.description, value: `${i}` },)
            }

            newChannel.send(itemExist ? { embeds: [embed], components: [new ActionRowBuilder().addComponents(select_menu.addOptions(menu))] } : { embeds: [embed] });
        }

        const embeds = new Embeds();
        if (!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply("권한이 없습니다.");
        const storeData = JSON.parse(fs.readFileSync(`./data/store/store.json`, "utf-8"));
        const command = interaction.options.getSubcommand();

        if (!storeData.storeChannel && command !== "채널지정") {
            return interaction.reply({ embeds: [embeds.error(`**/채널지정 / <#채널>** 을 통해 상점 채널을 먼저 지정해주세요.`)] })
        }

        switch (command) {
            case "품목추가":
                storeData.items.push({
                    name: interaction.options.getString("이름"),
                    description: interaction.options.getString("설명"),
                    price: interaction.options.getInteger("가격"),
                    quantity: 0
                })
                fs.writeFileSync(`./data/store/store.json`, JSON.stringify(storeData));
                display();
                return interaction.reply({ embeds: [embeds.success(`품목이 추가되었습니다.\n상점이 업데이트되었습니다.`)] });
            
            case "품목삭제":
                if (storeData.items.findIndex(i => i.name == interaction.options.getString("품목")) == -1) return interaction.reply({ embeds: [embeds.error("알 수 없는 품목입니다.")] })

                storeData.items.splice(storeData.items.findIndex(i => i.name == interaction.options.getString("품목")), 1);
    
                fs.writeFileSync(`./data/store/store.json`, JSON.stringify(storeData));
                display();
                return interaction.reply({ embeds: [embeds.success(`품목이 삭제되었습니다.\n상점이 업데이트되었습니다.`)] });

            case "재고추가":
                for (var i = 0; i < storeData.items.length; i++) {
                    if (interaction.options.getString("품목") === storeData.items[i].name) {
                        storeData.items[i].quantity += interaction.options.getInteger("갯수");
                    }
                }
                fs.writeFileSync(`./data/store/store.json`, JSON.stringify(storeData));
                display();
                return interaction.reply({ embeds: [embeds.success(`재고가 추가되었습니다.\n상점이 업데이트되었습니다.`)] });

            case "채널지정":
                const channel = interaction.options.getChannel("상점채널");
                const adminChannel = interaction.options.getChannel("관리채널");
                storeData.storeAdminChannel = adminChannel.id;
                storeData.storeChannel = channel.id;
                fs.writeFileSync(`./data/store/store.json`, JSON.stringify(storeData));
                display();
                return interaction.reply({ embeds: [embeds.success(`채널이 지정되었습니다.\n**/품목추가 <이름> <설명> <가격>** 을 통해 상품을 진열하세요.`)] });

            default:
                break;
        }
    }
}