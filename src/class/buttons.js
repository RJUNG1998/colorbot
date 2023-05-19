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