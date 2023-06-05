const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, MessageAttachment } = require('discord.js');
const Discord = require('discord.js')
const fs = require('fs');
const Embeds = require('../../class/embeds');
const User = require('../../schemas/user');
require('dotenv').config();
const AWS = require("aws-sdk");
const Canvas = require('@napi-rs/canvas');
const { request } = require('undici');
const priceAdjust = require('../../class/priceAdjust.js');
const { join } = require('path')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("정보")
        .setDescription("유저의 정보를 확인합니다.")
        .addUserOption(option =>
            option.setName("대상")
                .setDescription('정보를 확인할 유저를 지정해주세요. (지정하지 않으면 자신의 정보를 확인합니다.)')
                .setRequired(false)),
    async execute(interaction, client) {

        let target;
        !interaction.options.getUser('대상') ? target = interaction.user : target = interaction.options.getUser('대상');

        const s3 = new AWS.S3({
            region: 'us-east-1',
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        });

        const storedUser = await client.fetchUser(
            target.id,
            interaction.guild.id
        );

        const storedGuild = await client.getGuild(
            storedUser.guildName
        );

        const storedRankItem = await client.getItems('info')

        Canvas.GlobalFonts.registerFromPath(join(__dirname, '..', '..', 'assets', 'fonts', 'CookieRun_Regular.ttf'), 'CookieRun')
        const canvas = Canvas.createCanvas(500, 188);
        const context = canvas.getContext('2d');

        
        const backgroundData = await s3.getObject({Bucket: 'colorbot', Key: `colorbot_rank/background/${storedRankItem.itemList.background[storedUser.profileSource.background].source}`})
        .promise();
        const coinData = await s3.getObject({Bucket: 'colorbot', Key: 'colorbot_rank/coin/coin.png'})
        .promise();
        const profileborderData = await s3.getObject({Bucket: 'colorbot', Key: `colorbot_rank/profileborder/${storedRankItem.itemList.profileborder[storedUser.exp.role].source}`})
        .promise();
        const profileNameBarData = await s3.getObject({Bucket: 'colorbot', Key: `colorbot_rank/profilenamebar/${storedRankItem.itemList.profilenamebar[storedUser.exp.role].source}`})
        .promise();
        // if (storedUser.profileSource.profileBorderFilter) {
        //     const profileborderData = await s3.getObject({Bucket: 'colorbot', Key: 'colorbot_rank/profileborder/profilebroder_default.png'})
        //     .promise();
        // }
        const xpbarData = await s3.getObject({Bucket: 'colorbot', Key: 'colorbot_rank/xpbar/levelbar_default.png'})
        .promise();
        const guildboxData = await s3.getObject({Bucket: 'colorbot', Key: 'colorbot_rank/guildbox/guildbox_default.png'})
        .promise();
        const achievementBarData = await s3.getObject({Bucket: 'colorbot', Key: `colorbot_rank/achievementbar/${storedRankItem.itemList.achievement[storedUser.profileSource.achievement].source}`})
        .promise();

        //Background image
        const background = await Canvas.loadImage(Buffer.from(backgroundData.Body));
        context.drawImage(background, 0, 0, canvas.width, canvas.height);

        //GuildBox image
        const guildbox = await Canvas.loadImage(Buffer.from(guildboxData.Body));
        context.drawImage(guildbox, 307, 21, guildbox.width, guildbox.height);

        //Achievement Bar image
        const achievementBar = await Canvas.loadImage(Buffer.from(achievementBarData.Body));
        context.drawImage(achievementBar, 155, 22, achievementBar.width, achievementBar.height);

        //Coin image
        const coin = await Canvas.loadImage(Buffer.from(coinData.Body));
        context.drawImage(coin, 182, 88, coin.width, coin.height);

        //xpbackgroundImage
        const xpbar = await Canvas.loadImage(Buffer.from(xpbarData.Body));
        context.drawImage(xpbar, 66, 141, xpbar.width, xpbar.height);

        //Profile Border
        const profileNameBar = await Canvas.loadImage(Buffer.from(profileNameBarData.Body));
        context.drawImage(profileNameBar, 85, 52, profileNameBar.width, profileNameBar.height);

        // //profileTitleBackground image
        // const guildlogo = await Canvas.loadImage(Buffer.from(guildlogoData.Body));
        // context.drawImage(guildlogo, 154, 11, 28, 28);

        if (storedGuild) {
            const guildlogoData = await s3.getObject({Bucket: 'colorbot', Key: 'colorbot_rank/guildlogo/guildlogo_1.png'})
            .promise();
        } else {
            //Achievement text
            context.textAlign = 'center';
            context.font = '20px CookieRun';
            context.fillStyle = '#ffffff';
            context.fillText("무소속", 393.5, 58)
        }

        // console.log(storedUser.profileSource.achievement)
        //Achievement text
        context.textAlign = 'center';
        context.font = '11px CookieRun';
        context.fillStyle = '#000000';
        context.fillText(storedRankItem.itemList.achievement[storedUser.profileSource.achievement].name, 210, 37)

        //Username text
        context.textAlign = 'center';
        context.font = '20px CookieRun';
        context.fillStyle = '#000000';
        context.fillText(interaction.guild.members.cache.get(target.id).displayName, 190, 72)

        //User Amount Rank
        context.textAlign = 'right';
        context.font = '10px CookieRun';
        const storedUserRank = await client.getRank(target.id, interaction.guild.id);
        context.fillText(`${String(storedUserRank.rank)}위`, 180, 97)
        context.strokeStyle = "#717070";
        context.lineWidth = 0.5;
        context.strokeText(`${String(storedUserRank.rank)}위`, 180, 97);

        //User Amount
        context.textAlign = 'left';
        context.font = '10px CookieRun';
        context.fillText(priceAdjust.priceCommas(storedUser.balance), 195, 97)
        context.fillStyle = '#000000';
        context.strokeStyle = "#717070";
        context.lineWidth = 0.5;
        context.strokeText(priceAdjust.priceCommas(storedUser.balance), 195, 97);


        //LV
        context.textAlign = 'center';
        context.font = '12px CookieRun';
        context.fillText(`LV`, 44, 138)
        context.fillStyle = '#000000';
        context.strokeStyle = "#717070";
        context.lineWidth = 0.5;
        context.strokeText(`LV`, 44, 138);

        //User Voice XP / Level
        context.textAlign = 'center';
        context.font = '23px CookieRun';
        context.fillText(String(storedUser.exp.voiceLevel), 43, 160)
        context.fillStyle = '#000000';
        context.strokeStyle = "#717070";
        context.lineWidth = 0.5;
        context.strokeText(String(storedUser.exp.voiceLevel), 43, 160);

        // // //User Total XP / Level
        // // context.font = '25px Malgun Gothic';
        // // context.fillText('3', 130, 175)

        //Arc for Total xp
        context.beginPath();
        context.strokeStyle = '#ffffff'
        context.fillStyle = '#E6C7D5';
        context.roundRect(69,144,210 * (storedUser.exp.voice/client.expTable.get(storedUser.exp.voiceLevel)[0]),15,9);
        context.stroke()
        context.fill();
        context.closePath();
        context.save()

        //Arc for profile pic
        context.beginPath();
        context.arc(79,72.5,42,0, Math.PI*2, true);
        context.closePath();
        context.clip();

        //Avatar image;
        const { body } = await request(target.displayAvatarURL({ extension: 'jpg' }))
        const avatar = await Canvas.loadImage(await body.arrayBuffer());
        context.drawImage(avatar, 37, 31, 84, 84);
        context.restore();

        //Profile Border
        const profileBorder = await Canvas.loadImage(Buffer.from(profileborderData.Body));
        context.drawImage(profileBorder, 33, 27, profileBorder.width, profileBorder.height);

        const attachment = new Discord.AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'rank-image.png'})
        return await interaction.reply({files: [attachment]})
        // console.log(attach)



        // const storedUser = await client.fetchUser(
        //     interaction.user.id,
        //     interaction.guild.id
        // );
        
        // return await interaction.reply(`채팅레벨: ${await storedUser.exp.chatLevel}\n채팅경험치: ${await storedUser.exp.chat}\n보이스레벨: ${await storedUser.exp.voiceLevel}\n보이스경험치: ${await storedUser.exp.voice}`);
    } 
}