const axios = require('axios')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { Timestamp } = require('mongodb')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('매치')
        .setDescription('매치를 불러옵니다')
        .addStringOption(option => 
            option.setName('전적')
                .setDescription('전적 ID를 입력하세요')),

    async execute(interaction, client) {
        const matchId = interaction.options.getString('전적')

        await Promise.all([
            axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${process.env.RIOT_API}`),
            axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}/timeline?api_key=${process.env.RIOT_API}`)
        ])
        .then(data => {
            let B_TOP, B_JGL, B_MID,B_ADC, B_SUP, R_TOP, R_JGL, R_MID, R_ADC, R_SUP
            // let playersArray = [{},{},{},{},{},{},{},{},{},{}]
            for (let i = 0; i < 5; i++) {
                switch (data[0].data.info.participants[i].individualPosition) {
                    case 'TOP':
                        B_TOP = data[0].data.info.participants[i]
                        console.log('블루 탑:', B_TOP.summonerName)
                        break;
                    case 'JUNGLE':
                        B_JGL = data[0].data.info.participants[i]
                        B_JGL.totalGold = data[1].data.info.frames[13].participantFrames[String(i+1)].totalGold
                        console.log('블루 정글:',B_JGL.summonerName)
                        break;
                    case 'MIDDLE':
                        B_MID = data[0].data.info.participants[i]
                        console.log('블루 미드:',B_MID.summonerName)
                        break;
                    case 'BOTTOM':
                        B_ADC = data[0].data.info.participants[i]
                        console.log('블루 원딜:',B_ADC.summonerName)
                        break;
                    case 'UTILITY':
                        B_SUP = data[0].data.info.participants[i]
                        console.log('블루 서폿:',B_SUP.summonerName)
                        break
                }
            }

            for (let x = 5; x < 10; x++) {
                switch (data[0].data.info.participants[x].individualPosition) {
                    case 'TOP':
                        R_TOP = data[0].data.info.participants[x]
                        console.log('레드 탑:', R_TOP.summonerName)
                        break;
                    case 'JUNGLE':
                        R_JGL = data[0].data.info.participants[x]
                        R_JGL.totalGold = data[1].data.info.frames[13].participantFrames[String(x+1)].totalGold
                        console.log('레드 정글:', R_JGL.summonerName)
                        break;
                    case 'MIDDLE':
                        R_MID = data[0].data.info.participants[x]
                        console.log('레드 미드:', R_MID.summonerName)
                        break;
                    case 'BOTTOM':
                        R_ADC = data[0].data.info.participants[x]
                        console.log('레드 원딜:', R_ADC.summonerName)
                        break;
                    case 'UTILITY':
                        R_SUP = data[0].data.info.participants[x]
                        console.log('레드 서폿:', R_SUP.summonerName)
                        break;
                } 
            }

            // data[1].info.frames[13].participantFrames['1'].xp
            // data[1].info.frames[13].participantFrames['2'].xp
            // data[1].info.frames[13].participantFrames['3'].xp
            // data[1].info.frames[13].participantFrames['4'].xp
            // data[1].info.frames[13].participantFrames['5'].xp
            // data[1].info.frames[13].participantFrames['6'].xp
            // data[1].info.frames[13].participantFrames['7'].xp
            // data[1].info.frames[13].participantFrames['8'].xp
            // data[1].info.frames[13].participantFrames['9'].xp
            // data[1].info.frames[13].participantFrames['10'].xp

            const milliseconds = data[0].data.info.gameCreation
            const date = new Date(milliseconds);
            const year = date.getFullYear();
            const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-based
            const day = ('0' + date.getDate()).slice(-2);
        
            const timeString = `${month}월 ${day}일 ${year}년`;

            

            // KP@14 (14분 킬관여율)
            let embed = new EmbedBuilder()
                .setTitle('NA1_' + data[0].data.info.gameId + '데이터')
                .addFields(
                    //top data
                    { name: `${B_TOP.summonerName} <:v_top:1021270357367332874>`, value: "> `KDA`" + ` ${B_TOP.kills}/${B_TOP.deaths}/${B_TOP.assists}` + "\n> `CSM`" + ` ${Math.round(B_TOP.totalMinionsKilled/(data[0].data.info.gameDuration/60)*10)/10}` + "\n> `DPM`" + ` ${Math.round(B_TOP.challenges.damagePerMinute*100)/100}` + "\n> `GPM`" + ` ${Math.round(B_TOP.challenges.goldPerMinute*100)/100}` + "\n> `DPG`" + ` ${Math.round((B_TOP.challenges.damagePerMinute)/(B_TOP.challenges.goldPerMinute)*100)/100}`, inline: true },
                    { name: '\u200b', value: '\u200b', inline: true },
                    { name: `${R_TOP.summonerName} <:v_top:1021270357367332874>`, value: "> `KDA`" + ` ${R_TOP.kills}/${R_TOP.deaths}/${R_TOP.assists}` + "\n> `CSM`" + ` ${Math.round(R_TOP.totalMinionsKilled/(data[0].data.info.gameDuration/60)*10)/10}` + "\n> `DPM`" + ` ${Math.round(R_TOP.challenges.damagePerMinute*100)/100}` + "\n> `GPM`" + ` ${Math.round(R_TOP.challenges.goldPerMinute*100)/100}` + "\n> `DPG`" + ` ${Math.round((R_TOP.challenges.damagePerMinute)/(R_TOP.challenges.goldPerMinute)*100)/100}`, inline: true },


                    //jungle data
                    { name: `${B_JGL.summonerName} <:v_jgl:1021270353651187762>`, value: "> `KDA`" + ` ${B_JGL.kills}/${B_JGL.deaths}/${B_JGL.assists}` + "\n> `DPM`" + ` ${Math.round(B_JGL.challenges.damagePerMinute*100)/100}` + "\n> `GD@14`" + ` ${B_JGL.totalGold - R_JGL.totalGold}` + "\n> `FBP`" + ` ${B_JGL.firstBloodKill || B_JGL.firstBloodAssist ? '100%' : '0%'}` + "\n> `CWP/M`" + ` ${(B_JGL.visionWardsBoughtInGame/(data[0].data.info.gameDuration/60))}`, inline: true },
                    { name: '\u200b', value: '\u200b', inline: true },
                    { name: `${R_JGL.summonerName} <:v_jgl:1021270353651187762>`, value: "> `KDA`" + ` ${R_JGL.kills}/${R_JGL.deaths}/${R_JGL.assists}` + "\n> `DPM`" + ` ${Math.round(R_JGL.challenges.damagePerMinute*100)/100}` + "\n> `GD@14`" + ` ${R_JGL.totalGold - B_JGL.totalGold}` + "\n> `FBP`" + ` ${R_JGL.firstBloodKill || R_JGL.firstBloodAssist ? '100%' : '0%'}` + "\n> `CWP/M`" + ` ${(R_JGL.visionWardsBoughtInGame/(data[0].data.info.gameDuration/60))}`, inline: true },


                    //mid data
                    { name: `${B_MID.summonerName} <:v_mid:1021270354842374214>`, value: "> `KDA`" + ` ${B_MID.kills}/${B_MID.deaths}/${B_MID.assists}` + "\n> `CSM`" + ` ${Math.round(B_MID.totalMinionsKilled/(data[0].data.info.gameDuration/60)*10)/10}` + "\n> `DPM`" + ` ${Math.round(B_MID.challenges.damagePerMinute*100)/100}` + "\n> `GPM`" + ` ${Math.round(B_MID.challenges.goldPerMinute*100)/100}` + "\n> `DPG`" + ` ${Math.round((B_MID.challenges.damagePerMinute)/(B_MID.challenges.goldPerMinute)*100)/100}`, inline: true},
                    { name: '\u200b', value: '\u200b', inline: true },
                    { name: `${R_MID.summonerName} <:v_mid:1021270354842374214>`, value: "> `KDA`" + ` ${R_MID.kills}/${R_MID.deaths}/${R_MID.assists}` + "\n> `CSM`" + ` ${Math.round(R_MID.totalMinionsKilled/(data[0].data.info.gameDuration/60)*10)/10}` + "\n> `DPM`" + ` ${Math.round(R_MID.challenges.damagePerMinute*100)/100}` + "\n> `GPM`" + ` ${Math.round(R_MID.challenges.goldPerMinute*100)/100}` + "\n> `DPG`" + ` ${Math.round((R_MID.challenges.damagePerMinute)/(R_MID.challenges.goldPerMinute)*100)/100}`, inline: true},


                    //adc data
                    { name: `${B_ADC.summonerName} <:v_adc:1021270358478827550>`, value: "> `KDA`" + ` ${B_ADC.kills}/${B_ADC.deaths}/${B_ADC.assists}` + "\n> `CSM`" + ` ${Math.round(B_ADC.totalMinionsKilled/(data[0].data.info.gameDuration/60)*10)/10}` + "\n> `DPM`" + ` ${Math.round(B_ADC.challenges.damagePerMinute*100)/100}` + "\n> `DMG/M-D`" + ` ${B_ADC.challenges.damagePerMinute - R_ADC.challenges.damagePerMinute}` + "\n> `DMG%`" + ` ${B_ADC.challenges.teamDamagePercentage}` + "\n> `GOLD%`"+ ` ${B_ADC.goldEarned/(B_TOP.goldEarned + B_JGL.goldEarned + B_MID.goldEarned + B_ADC.goldEarned + B_SUP.goldEarned)}`, inline: true},
                    { name: '\u200b', value: '\u200b', inline: true },
                    { name: `${R_ADC.summonerName} <:v_adc:1021270358478827550>`, value: "> `KDA`" + ` ${R_ADC.kills}/${R_ADC.deaths}/${R_ADC.assists}` + "\n> `CSM`" + ` ${Math.round(R_ADC.totalMinionsKilled/(data[0].data.info.gameDuration/60)*10)/10}` + "\n> `DPM`" + ` ${Math.round(R_ADC.challenges.damagePerMinute*100)/100}` + "\n> `DMG/M-D`" + ` ${R_ADC.challenges.damagePerMinute - B_ADC.challenges.damagePerMinute}` + "\n> `DMG%`" + ` ${R_ADC.challenges.teamDamagePercentage}` + "\n> `GOLD%`"+ ` ${R_ADC.goldEarned/(R_TOP.goldEarned + R_JGL.goldEarned + R_MID.goldEarned + R_ADC.goldEarned + R_SUP.goldEarned)}`, inline: true},


                    //sup data
                    { name: `${B_SUP.summonerName} <:v_sup:1021270356159369236>`, value: "> `KDA`" + ` ${B_SUP.kills}/${B_SUP.deaths}/${B_SUP.assists}` + "\n> `KP`" + ` ${B_SUP.challenges.killParticipation}` + "\n> `VS/M`" + ` ${B_SUP.challenges.visionScorePerMinute}` + "\n> `CWP/M`" + ` ${(B_SUP.visionWardsBoughtInGame/(data[0].data.info.gameDuration/60))}` + "\n> `WP/M`" + ` ${(B_SUP.wardsPlaced/(data[0].data.info.gameDuration/60))}` + "\n> `WK/M`" + ` ${(B_SUP.wardsKilled/(data[0].data.info.gameDuration/60))}` + "\n> `CCS`" + ` ${B_SUP.timeCCingOthers}`, inline: true},
                    { name: '\u200b', value: '\u200b', inline: true },
                    { name: `${R_SUP.summonerName} <:v_sup:1021270356159369236>`, value: "> `KDA`" + ` ${R_SUP.kills}/${R_SUP.deaths}/${R_SUP.assists}` + "\n> `KP`" + ` ${R_SUP.challenges.killParticipation}` + "\n> `VS/M`" + ` ${R_SUP.challenges.visionScorePerMinute}` + "\n> `CWP/M`" + ` ${(R_SUP.visionWardsBoughtInGame/(data[0].data.info.gameDuration/60))}` + "\n> `WP/M`" + ` ${(R_SUP.wardsPlaced/(data[0].data.info.gameDuration/60))}` + "\n> `WK/M`" + ` ${(R_SUP.wardsKilled/(data[0].data.info.gameDuration/60))}` + "\n> `CCS`" + ` ${R_SUP.timeCCingOthers}`, inline: true},
                )
                .setFooter({ text: `Created in ${timeString}`})
            interaction.reply({ embeds: [embed] })
        }).catch(err => {
            console.log(err)
        })
    }
}