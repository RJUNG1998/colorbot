const { SlashCommandBuilder, StringSelectMenuBuilder, EmbedBuilder, ActionRowBuilder } = require('discord.js');
const fs = require('fs');
const Embeds = require('../src/class/embeds');
const priceAdjust = require('../src/class/priceAdjust');

module.exports = {
    data: {
        name: `storemenu`
    },
    async execute(interaction, client) {
        const embeds = new Embeds();

        const user = JSON.parse(fs.readFileSync(`./data/user/${interaction.user.id}.json`, "utf-8"));
        const storeData = JSON.parse(fs.readFileSync(`./data/store/store.json`, 'utf-8'));
        const storeChannel = client.channels.cache.get(storeData.storeChannel);
        const storeAdminChannel = client.channels.cache.get(storeData.storeAdminChannel);

        if (user.money < storeData.items[Number(interaction.values[0])].price) {
            return interaction.reply({ embeds: [embeds.storePurhcaseError("잔액이 부족하여 상품을 구매할 수 없습니다.")], ephemeral: true });
        } else if (storeData.items[Number(interaction.values[0])].quantity <= 0) {
            return interaction.reply({ embeds: [embeds.storePurhcaseError("재고가 부족하여 상품을 구매할 수 없습니다.")], ephemeral: true });
        }

        user.money -= storeData.items[Number(interaction.values[0])].price;
        storeData.items[Number(interaction.values[0])].quantity -= 1;

        storeAdminChannel.send({ embeds: [embeds.storeAdminPurchaseNotice(interaction.user.id, storeData.items[Number(interaction.values[0])].name)] });

        fs.writeFileSync(`./data/user/${interaction.user.id}.json`, JSON.stringify(user));
        fs.writeFileSync(`./data/store/store.json`, JSON.stringify(storeData));

        storeChannel.bulkDelete(1);
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

        storeChannel.send(itemExist ? { embeds: [embed], components: [new ActionRowBuilder().addComponents(select_menu.addOptions(menu))] } : { embeds: [embed] });
    }
}