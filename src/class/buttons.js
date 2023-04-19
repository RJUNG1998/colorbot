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

    gameroomCreateButton() {
        return new ButtonBuilder()
            .setCustomId("gameroomcreate")
            .setStyle(ButtonStyle.Primary)
            .setDisabled(false)
            .setLabel("생성하기")
    }

    gameroomJoinButton() {
        return new ButtonBuilder()
            .setCustomId("gameroomjoin")
            .setStyle(ButtonStyle.Success)
            .setDisabled(false)
            .setLabel("참여")
    }

    gameroomThreadLeave() {
        return new ButtonBuilder()
            .setCustomId("gameroomleave")
            .setStyle(ButtonStyle.Danger)
            .setDisabled(false)
            .setLabel("나가기")
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
}