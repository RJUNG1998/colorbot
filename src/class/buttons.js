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

    inhouseRegisteredButton() {
        return new ButtonBuilder()
            .setCustomId('inhouseRegisteredButton')
            .setLabel("수락")
            .setStyle(ButtonStyle.Success)
    }

    inhouseDeniedButton() {
        return new ButtonBuilder()
            .setCustomId('inhouseDeniedButton')
            .setLabel("거절")
            .setStyle(ButtonStyle.Danger)
    }

}