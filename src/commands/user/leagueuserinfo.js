const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
require('dotenv').config();
const axios = require('axios');
const User = require('../../schemas/user');
const Embeds = require('../../class/embeds')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('롤')
        .setDescription('롤 정보를 저장 및 불러옵니다.')
        .addSubcommand(option =>
            option.setName("유저등록")
                .setDescription("자신의 롤 정보를 등록합니다.")
                .addStringOption(option => 
                    option.setName("소환사이름")
                        .setDescription("자신의 리그오브레전드 소환사 이름을 적어주세요.")
                        .setRequired(true)))
        .addSubcommand(option =>
            option.setName("유저정보")
                .setDescription("지정한 유저의 롤 정보를 불러옵니다.")
                .addUserOption(option => 
                    option.setName("유저")
                        .setDescription("확인하고 싶은 유저의 이름을 적어주세요.")
                        .setRequired(false))),
    async execute(interaction, client) {
        const subcommand = interaction.options.getSubcommand();
        const embed = new Embeds();

        const storedUser = await client.fetchUser(interaction.user.id, interaction.guild.id);

        const getSummonerId = (summonerName) => {
            return axios.get(
                `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.RGAPI_APIKEY}`
            ).then(response => {
                this.response = response.data;
                return this.response
            }).catch(err => {
                console.log(err);
            })
        }

        const getSummonerData = (summonerId) => {
            return axios.get(
                `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${process.env.RGAPI_APIKEY}`
            ).then(response => {
                this.response = response.data
                return this.response
            }).catch(err => {
                return console.log(`Error: ${err}`)
            }) 
        };

        switch (subcommand) {
            case "유저등록":
                await getSummonerId(interaction.options.getString("소환사이름"))
                    .then(data => {
                        return User.findOneAndUpdate(
                            { _id: storedUser._id },
                            {
                                'league.id': data.id,
                                'league.summonerName': interaction.options.getString("소환사이름")
                            },
                            {
                                new: true
                            }
                        )
                    }).then(t => {
                        return interaction.reply({ embeds: [embed.success("정상적으로 소환사 정보가 등록되었습니다.")] })
                    }).catch(err => {
                        return interaction.reply({ embeds: [embed.error("소환사 이름을 인식 못하였습니다.")]})
                    })
                break;
            case "유저정보":
                const target = !interaction.options.getUser('유저') ? target = interaction.user : target = interaction.options.getUser('유저');
                const storedTargetUser = await client.fetchUser(target.id, interaction.guild.id);
                await getSummonerData(storedTargetUser.league.id)
                    .then(data => {
                        const solo = data.filter((i) => {
                            return i.queueType == 'RANKED_SOLO_5x5'
                        })
                        const flex = data.filter((i) => {
                            return i.queueType == 'RANKED_FLEX_SR'
                        })

                        const rankEmbed = new EmbedBuilder()
                            .setFooter({ text: `𓇼PALETTE𓇼`, iconURL: `https://cdn.discordapp.com/banners/937556248847581244/8487863eb9ed580eee9158f944d28fc0.webp?size=240`})
                            .setFields({ name: "소환사 이름", value: `${storedTargetUser.league.summonerName}` })

                        if (!solo.length && !flex.length) {
                            rankEmbed.addFields({ name: "솔로 랭크", value: `UNRANKED` })
                            rankEmbed.addFields({ name: "자유 랭크", value: `UNRANKED` })
                        } else {
                            if (solo.length && flex.length) {
                                rankEmbed.addFields({ name: "솔로 랭크", value: `${solo[0].tier} ${solo[0].rank}` })
                                rankEmbed.addFields({ name: "자유 랭크", value: `${flex[0].tier} ${flex[0].rank}` })
                            } else if (solo.length) {
                                rankEmbed.addFields({ name: "솔로 랭크", value: `${solo[0].tier} ${solo[0].rank}` })
                                rankEmbed.addFields({ name: "자유 랭크", value: `UNRANKED` })
                            } else {
                                rankEmbed.addFields({ name: "솔로 랭크", value: `UNRANKED` })
                                rankEmbed.addFields({ name: "자유 랭크", value: `${flex[0].tier} ${flex[0].rank}` })
                            }
                            return interaction.reply({ embeds: [rankEmbed] });
                        }
                    }).catch(err => {
                        console.log(err);
                        return interaction.reply({ embeds: [embed.error("해당 유저의 정보를 불러오지 못하였습니다.")]})
                    })
                break;
            default:
                break;
        }
    }
}