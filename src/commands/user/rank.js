const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, MessageAttachment } = require('discord.js');
const Discord = require('discord.js')
const fs = require('fs');
const Embeds = require('../../class/embeds');
const User = require('../../schemas/user');
require('dotenv').config();
const AWS = require("aws-sdk");
const { config } = require('dotenv');
const Canvas = require('@napi-rs/canvas');
const { request } = require('undici');
const priceAdjust = require('../../class/priceAdjust.js');

const PRICE = 1000;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("랭크")
        .setDescription("유저의 랭크를 확인합니다."),
    async execute(interaction, client) {

        const s3 = new AWS.S3({
            region: 'us-east-1',
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        });
        
        const data = await s3.getObject({Bucket: 'colorbot', Key: 'colorbot_rank/colorbot_rank_background_default.png'})
        .promise();

        const storedUser = await client.fetchUser(
            interaction.user.id,
            interaction.guild.id
        );

        //Background image
        let buf = Buffer.from(data.Body);
        const backgroundImage = new Discord.AttachmentBuilder(buf, 'test.png')

        const canvas = Canvas.createCanvas(500, 188);
        const context = canvas.getContext('2d');

        const background = await Canvas.loadImage(buf);
        context.drawImage(background, 0, 0, canvas.width, canvas.height);

        //Username text
        context.textAlign = 'center';
        context.font = '35px Malgun Gothic';
        context.fillStyle = '#000000';
        // context.fillText(interaction.member.displayName, 220, 70)
        context.fillText("힝", 220, 70)

        //User Amount
        context.textAlign = 'left';
        context.font = '15px Malgun Gothic';
        context.fillText(priceAdjust.priceCommas(storedUser.balance), 180, 105)

        //User Chat XP / Level
        context.fillStyle = '#ffffff';
        context.fillText(String(storedUser.exp.chatLevel), 160, 130)

        //User Voice XP / Level
        context.fillText(String(storedUser.exp.voiceLevel), 160, 150)

        //User Total XP / Level
        context.font = '25px Malgun Gothic';
        context.fillText('3', 130, 175)

        //Arc for chat xp
        context.beginPath();
        context.fillStyle = '#F4C2C2';
        context.roundRect(200,121,100,10, 5);
        context.stroke()
        context.fill();
        context.closePath();

        //Arc for voice xp
        context.beginPath();
        context.fillStyle = '#F4C2C2';
        context.roundRect(200,140,80,10, 5);
        context.stroke()
        context.fill();
        context.closePath();

        //Arc for Total xp
        context.beginPath();
        context.fillStyle = '#F4C2C2';
        context.strokeStyle('rgba(0,0,0,0)')
        context.roundRect(200,160,150,18,9);
        context.stroke()
        context.fill();
        context.closePath();

        //Arc for profile pic
        context.beginPath();
        context.arc(90,80,60,0, Math.PI*2, true);
        context.closePath();
        context.clip();

        //Avatar image;
        const { body } = await request(interaction.user.displayAvatarURL({ extension: 'jpg' }))
        const avatar = await Canvas.loadImage(await body.arrayBuffer());
        context.drawImage(avatar, 30, 20, 120, 120);

        const attachment = new Discord.AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'rank-image.png'})
        interaction.reply({files: [attachment]})
        // console.log(attach)



        // const storedUser = await client.fetchUser(
        //     interaction.user.id,
        //     interaction.guild.id
        // );
        
        // return await interaction.reply(`채팅레벨: ${await storedUser.exp.chatLevel}\n채팅경험치: ${await storedUser.exp.chat}\n보이스레벨: ${await storedUser.exp.voiceLevel}\n보이스경험치: ${await storedUser.exp.voice}`);
    } 
}