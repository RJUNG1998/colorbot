const { ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = class Button {
    nextButton() {
        return new ButtonBuilder()
            .setCustomId("next")
            .setStyle(ButtonStyle.Success)
            .setDisabled(false)
            .setLabel("다음");
    }

    previousButton() {
        return new ButtonBuilder()
            .setCustomId("previous")
            .setStyle(ButtonStyle.Success)
            .setDisabled(true)
            .setLabel("이전");
    }

    supportButton(id) {
        if (id === "supportreport") {
            return new ButtonBuilder()
                .setCustomId('supportreport')
                .setLabel(`신고`)
                .setStyle(ButtonStyle.Success)
        } else if (id === "supportsuggestion") {
            return new ButtonBuilder()
                .setCustomId('supportsuggestion')
                .setLabel(`개선`)
                .setStyle(ButtonStyle.Success)
        } else if (id === "supportsupport") {
            return new ButtonBuilder()
                .setCustomId('supportsupport')
                .setLabel(`상담`)
                .setStyle(ButtonStyle.Success)
        } else if (id === "supportsupportexit") {
            return new ButtonBuilder()
                .setCustomId('supportsupportexit')
                .setLabel('닫기')
                .setStyle(ButtonStyle.Danger)
        }
    }

    writeAcceptDenyButton(id) {
        if (id === 'writeaccept') {
            return new ButtonBuilder()
                .setCustomId('writeaccept')
                .setLabel("승낙")
                .setStyle(ButtonStyle.Success)
        } else if (id === 'writedeny') {
            return new ButtonBuilder()
                .setCustomId('writedeny')
                .setLabel('거절')
                .setStyle(ButtonStyle.Danger)
        }
    }

    writeCommentButton() {
        return new ButtonBuilder()
            .setCustomId('writeCommentButton')
            .setLabel("익명 댓글 작성")
            .setStyle(ButtonStyle.Primary)
    }

    rockpaperscissorsJoin() {
        return new ButtonBuilder()
            .setCustomId('rockpaperscissorsjoin')
            .setLabel("참가")
            .setStyle(ButtonStyle.Success)
    }

    rockpaperscissorsType(type) {
        if (type === 'paper') {
            return new ButtonBuilder()
            .setCustomId('rockpaperscissorspaper')
            .setLabel("빠")
            .setStyle(ButtonStyle.Success)
        } else if (type === 'scissors') {
            return new ButtonBuilder()
            .setCustomId('rockpaperscissorsscissors')
            .setLabel("찌")
            .setStyle(ButtonStyle.Success)
        } else {
            return new ButtonBuilder()
            .setCustomId('rockpaperscissorsrock')
            .setLabel("묵")
            .setStyle(ButtonStyle.Success)
        }
    }

    inhouseButton(id) {
        if (id === 'inhouseRegister') {
            return new ButtonBuilder()
                .setCustomId('inhouseRegister')
                .setLabel(`내전등록`)
                .setEmoji('1107956619528122398')
                .setStyle(ButtonStyle.Success)
        } else if (id === 'inhouseAdd') {
            return new ButtonBuilder()
                .setCustomId('inhouseAdd')
                .setLabel(`라인요청`)
                .setEmoji('1107957594439565363')
                .setStyle(ButtonStyle.Primary) 
        } else if (id === 'inhouseAsk') {
            return new ButtonBuilder()
                .setCustomId('inhouseAsk')
                .setLabel(`질문하기`)
                .setEmoji('1108004156813344889')
                .setStyle(ButtonStyle.Secondary)
        } else if (id === 'inhouseLink') {
            return new ButtonBuilder()
                .setLabel(`내전 데이터 시트`)
                .setURL('https://docs.google.com/spreadsheets/d/1tjFyXdBc1qDftkHZVG5tJN5hDoSCATAcXNi_KbvyeBI/edit?usp=sharing')
                .setStyle(ButtonStyle.Link)
        } else if (id === 'inhouseRift') {
            return new ButtonBuilder()
                .setCustomId('inhouseRift')
                .setLabel(`협곡`)
                .setStyle(ButtonStyle.Success)
        } else if (id === 'inhouseAram') {
            return new ButtonBuilder()
                .setCustomId('inhouseAram')
                .setLabel(`칼바람`)
                .setStyle(ButtonStyle.Success)
        } else if (id === 'inhouseValorant') {
            return new ButtonBuilder()
                .setCustomId('inhouseValorant')
                .setLabel(`발로란트`)
                .setStyle(ButtonStyle.Success)
        } else if (id === 'inhouseAnswer') {
            return new ButtonBuilder()
                .setCustomId('inhouseAnswer')
                .setLabel(`답변하기`)
                .setStyle(ButtonStyle.Primary)
        } else if (id === 'inhouseFinish') {
            return new ButtonBuilder()
                .setCustomId('inhouseFinish')
                .setLabel(`완료`)
                .setStyle(ButtonStyle.Success)
        } else if (id === 'inhouseReject') {
            return new ButtonBuilder()
                .setCustomId('inhouseReject')
                .setLabel(`거부`)
                .setStyle(ButtonStyle.Danger)
        }
    }

    inhouseLane(id) {
        if (id === 'inhouseTop') {
            return new ButtonBuilder()
                .setCustomId('inhouseTop')
                .setLabel(`탑`)
                .setStyle(ButtonStyle.Primary)
        } else if (id === 'inhouseJgl') {
            return new ButtonBuilder()
                .setCustomId('inhouseJgl')
                .setLabel(`정글`)
                .setStyle(ButtonStyle.Primary)
        } else if (id === 'inhouseMid') {
            return new ButtonBuilder()
                .setCustomId('inhouseMid')
                .setLabel(`미드`)
                .setStyle(ButtonStyle.Primary)
        } else if (id === 'inhouseAdc') {
            return new ButtonBuilder()
                .setCustomId('inhouseAdc')
                .setLabel(`원딜`)
                .setStyle(ButtonStyle.Primary)
        } else if (id === 'inhouseSup') {
            return new ButtonBuilder()
                .setCustomId('inhouseSup')
                .setLabel(`서폿`)
                .setStyle(ButtonStyle.Primary)
        } else if (id === 'inhouseSubTop') {
            return new ButtonBuilder()
                .setCustomId('inhouseSubTop')
                .setLabel(`서브 탑`)
                .setStyle(ButtonStyle.Secondary)
        } else if (id === 'inhouseSubJgl') {
            return new ButtonBuilder()
                .setCustomId('inhouseSubJgl')
                .setLabel(`서브 정글`)
                .setStyle(ButtonStyle.Secondary)
        } else if (id === 'inhouseSubMid') {
            return new ButtonBuilder()
                .setCustomId('inhouseSubMid')
                .setLabel(`서브 미드`)
                .setStyle(ButtonStyle.Secondary)
        } else if (id === 'inhouseSubAdc') {
            return new ButtonBuilder()
                .setCustomId('inhouseSubAdc')
                .setLabel(`서브 원딜`)
                .setStyle(ButtonStyle.Secondary)
        } else if (id === 'inhouseSubSup') {
            return new ButtonBuilder()
                .setCustomId('inhouseSubSup')
                .setLabel(`서브 서폿`)
                .setStyle(ButtonStyle.Secondary)
        }
    }
}