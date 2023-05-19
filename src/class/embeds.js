const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Embed } = require('discord.js');
const priceAdjust = require('./priceAdjust');

module.exports = class Error {
    economyError() {
        return new EmbedBuilder()
            .setTitle('에러')
            .setThumbnail(`https://cdn-icons-png.flaticon.com/512/595/595067.png`)
            .setDescription('경제 시스템에 먼저 가입 하셔야 합니다.')
            .setColor("FFD764")
            .setFooter({ text: `𓇼PALETTE𓇼`, iconURL: `https://cdn.discordapp.com/banners/937556248847581244/8487863eb9ed580eee9158f944d28fc0.webp?size=240`})
    }

    targetEconomyError() {
        return new EmbedBuilder()
            .setTitle('에러')
            .setThumbnail(`https://cdn-icons-png.flaticon.com/512/595/595067.png`)
            .setDescription('송금 대상이 경제 시스템에 먼저 가입 하셔야 합니다.')
            .setColor("FFD764")
            .setFooter({ text: `𓇼PALETTE𓇼`, iconURL: `https://cdn.discordapp.com/banners/937556248847581244/8487863eb9ed580eee9158f944d28fc0.webp?size=240`})
    }

    bothPlayerOnGame() {
        return new EmbedBuilder()
            .setTitle('에러')
            .setThumbnail(`https://cdn-icons-png.flaticon.com/512/595/595067.png`)
            .setDescription('두 플레이어 모두 진행중이던 게임을 끝내셔야 합니다.')
            .setColor("FFD764")
            .setFooter({ text: `𓇼PALETTE𓇼`, iconURL: `https://cdn.discordapp.com/banners/937556248847581244/8487863eb9ed580eee9158f944d28fc0.webp?size=240`})
    }

    sendMoneySuccess(targetId, amount) {
        return new EmbedBuilder()
            .setTitle('송금 성공')
            .setThumbnail(`https://cdn-icons-png.flaticon.com/512/9696/9696804.png`)
            .addFields(
                { "name": "대상", "value": `<@${targetId}>` }, 
                { "name": "금액", "value": `\`${priceAdjust.priceCommas(amount)}\`\원` })
            .setColor("Green")
            .setFooter({ text: `𓇼PALETTE𓇼`, iconURL: `https://cdn.discordapp.com/banners/937556248847581244/8487863eb9ed580eee9158f944d28fc0.webp?size=240`})
    }

    sendMoneyFail() {
        return new EmbedBuilder()
            .setTitle('에러')
            .setThumbnail(`https://cdn-icons-png.flaticon.com/512/595/595067.png`)
            .setDescription('잔액이 부족합니다.')  
            .setColor("FFD764")
            .setFooter({ text: `𓇼PALETTE𓇼`, iconURL: `https://cdn.discordapp.com/banners/937556248847581244/8487863eb9ed580eee9158f944d28fc0.webp?size=240`})
    }

    assetCheckError() {
        return new EmbedBuilder()
            .setTitle('에러')
            .setThumbnail(`https://cdn-icons-png.flaticon.com/512/595/595067.png`)
            .setDescription('대상의 돈 정보를 불러올 수 없습니다.')
            .setFooter({ text: `𓇼PALETTE𓇼`, iconURL: `https://cdn.discordapp.com/banners/937556248847581244/8487863eb9ed580eee9158f944d28fc0.webp?size=240`})
            .setColor("FFD764");
    }

    assetCheckSuccess(targetId, amount, targetRank) {
        return new EmbedBuilder()
            .setDescription(
                `<@!${targetId}> **님의 자산**
                \n \`${targetRank}위\` \`${priceAdjust.priceCommas(amount)}\`\원`)
            .setThumbnail(`https://cdn-icons-png.flaticon.com/512/4498/4498253.png`)
            .setColor("90D483")
            .setFooter({ text: `𓇼PALETTE𓇼`, iconURL: `https://cdn.discordapp.com/banners/937556248847581244/8487863eb9ed580eee9158f944d28fc0.webp?size=240`})
    }

    attendanceSuccess(amount) {
        return new EmbedBuilder()
            .setTitle("출석 성공")
            .setThumbnail(`https://cdn-icons-png.flaticon.com/512/5454/5454591.png`)
            .setDescription(`\`${priceAdjust.priceCommas(amount)}\`\원이 지급되었습니다.`)
            .setColor("6ED5A1")
            .setFooter({ text: `𓇼PALETTE𓇼`, iconURL: `https://cdn.discordapp.com/banners/937556248847581244/8487863eb9ed580eee9158f944d28fc0.webp?size=240`})
    }

    attendanceError() {
        return new EmbedBuilder()
            .setTitle("출석 실패")
            .setThumbnail(`https://cdn-icons-png.flaticon.com/512/5454/5454601.png`)
            .setDescription("오늘은 이미 출석체크를 하셨습니다.")
            .setColor("EB5569")
            .setFooter({ text: `𓇼PALETTE𓇼`, iconURL: `https://cdn.discordapp.com/banners/937556248847581244/8487863eb9ed580eee9158f944d28fc0.webp?size=240`})
    }

    registerSuccess() {
        return new EmbedBuilder()
            .setTitle('가입 성공')
            .setThumbnail(`https://cdn-icons-png.flaticon.com/512/845/845646.png`)
            .setDescription('팔레트의 경제 시스템을 마음껏 즐겨주세요!')
            .setColor("3BB54A")
            .setFooter({ text: `𓇼PALETTE𓇼`, iconURL: `https://cdn.discordapp.com/banners/937556248847581244/8487863eb9ed580eee9158f944d28fc0.webp?size=240`})
    }

    registerFail() {
        return new EmbedBuilder()
            .setTitle('가입 실패')
            .setThumbnail(`https://cdn-icons-png.flaticon.com/512/595/595067.png`)
            .setDescription('이미 가입하셨습니다.')
            .setColor("FFD764")
            .setFooter({ text: `𓇼PALETTE𓇼`, iconURL: `https://cdn.discordapp.com/banners/937556248847581244/8487863eb9ed580eee9158f944d28fc0.webp?size=240`})
    }

    ranking() {
        return new EmbedBuilder()
            .setTitle("자산 순위")
            .setThumbnail(`https://cdn-icons-png.flaticon.com/512/1603/1603847.png`)
            .setColor("Orange")
            .setFooter({ text: `𓇼PALETTE𓇼`, iconURL: `https://cdn.discordapp.com/banners/937556248847581244/8487863eb9ed580eee9158f944d28fc0.webp?size=240`}) 
    }

    assetManageSuccess(targetId, oldAmount, newAmount) {
        return new EmbedBuilder()
            .setTitle(`수정 완료`)
            .setThumbnail(`https://cdn-icons-png.flaticon.com/512/535/535786.png`)
            .setDescription(`<@${targetId}>님의 잔액이 다음과 같이 수정되었습니다. \n \n**수정 전**: \`${priceAdjust.priceCommas(oldAmount)}\`원 \n **수정 후**: \`${priceAdjust.priceCommas(newAmount)}\`원`)
            .setColor("1BB7EA")
            .setFooter({ text: `𓇼PALETTE𓇼`, iconURL: `https://cdn.discordapp.com/banners/937556248847581244/8487863eb9ed580eee9158f944d28fc0.webp?size=240`})
    }

    error(text) {
        return new EmbedBuilder()
            .setTitle("오류")
            .setColor("Red")
            .setThumbnail(`https://cdn-icons-png.flaticon.com/512/535/535786.png`)
            .setDescription(text)
            .setFooter({ text: `𓇼PALETTE𓇼`, iconURL: `https://cdn.discordapp.com/banners/937556248847581244/8487863eb9ed580eee9158f944d28fc0.webp?size=240`})
    }

    success(text) {
        return new EmbedBuilder()
            .setTitle("완료")
            .setColor("Green")
            .setThumbnail(`https://cdn-icons-png.flaticon.com/512/535/535786.png`)
            .setDescription(text)
            .setFooter({ text: `𓇼PALETTE𓇼`, iconURL: `https://cdn.discordapp.com/banners/937556248847581244/8487863eb9ed580eee9158f944d28fc0.webp?size=240`})
    }

    storePurhcaseError(text) {
        return new EmbedBuilder()
            .setDescription(text)
            .setTitle("구매 실패")
            .setColor("Red")
            .setThumbnail(`https://cdn-icons-png.flaticon.com/512/535/535786.png`)
            .setFooter({ text: `𓇼PALETTE𓇼`, iconURL: `https://cdn.discordapp.com/banners/937556248847581244/8487863eb9ed580eee9158f944d28fc0.webp?size=240`});
    }

    storeAdminPurchaseNotice(userId, itemName) {
        return new EmbedBuilder()
            .setTitle("상품 판매됨")
            .addFields({ name: '구매자', value: `<@${userId}>`, inline: true }, { name: '상품', value: `${itemName}`, inline: true })
            .setColor("Blue")
            .setTimestamp();
    }

    supportEmbed() {
        return new EmbedBuilder()
            .setColor(`Red`)
            .setTitle("팔레트 종합 건의함")
            .setDescription(`신고: **유저를 신고합니다**\n개선: **서버 개선을 제의합니다**\n상담: **1대1 상담 채널을 생성합니다** `)
            .setFooter({ text: `𓇼PALETTE𓇼`, iconURL: `https://cdn.discordapp.com/attachments/1013114492948840540/1095783759216922654/IMG_4037.png`})
    }

    writeCommentEmbed() {
        return new EmbedBuilder()
            .setDescription("/익명댓글 로 익명으로 댓글 작성 가능합니다.")
    }

    writeCommentAnoEmbed(nickname, content) {
        return new EmbedBuilder()
            .setTimestamp()
            .setFooter({ text: `by ${nickname}` })
            .setDescription(content)
    }

    inhouseEmbed() {
        return new EmbedBuilder()
            .setColor('Orange')
            .setTitle("이용방법")
            .setDescription('`/내전` 명령어를 입력하여 사용 가능합니다.')
            .setFooter({ text: `𓇼PALETTE𓇼`, iconURL: `https://cdn.discordapp.com/attachments/1013114492948840540/1095783759216922654/IMG_4037.png`})
    }

    inhouseEmbed() {
        return new EmbedBuilder()
            .setColor('Orange')
            .setTitle("등록 설명서")
            .addFields(
                { name: '`Q.` 내전을 하고 싶은데 참가는 어떻게 하나요?', value: '`A.` *아래 버튼을 클릭하여 등록을 하시면 최대한 빠른 시간 내에 관리자들이 검토 후 내전 참가 권한을 지급해 드립니다. 이때 기본적으로 메인 라인 역할이 지급되며, 서브 라인은 전적 데이터를 기반으로 추가 여부가 결정됩니다.*\n‎'},
                { name: '`Q.` 서브 라인 역할은 어떻게 받나요?`', value: '`A.` *아래 버튼을 클릭하여 요청을 하시면 [오피지지](https://www.op.gg/)를 검토 후 여부에 따라 역할을 지급해 드립니다. 꼭! 해당 라인의 전적을 쌓고 난 후에 신청해주시길 바랍니다!*\n‎'},
                { name: '`Q.` 내전 관련 질문은 누구한테 해야 하나요?`', value: '`A.` *밑에 버튼을 클릭하여 질문을 해주시면 최대한 빠른 시간 내에 DM으로 답변해 드립니다.*'},
            )
            .setFooter({ text: `𓇼PALETTE𓇼`, iconURL: `https://cdn.discordapp.com/attachments/1013114492948840540/1095783759216922654/IMG_4037.png`})
    }
}