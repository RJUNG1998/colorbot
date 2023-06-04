module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        const introRole = "951197966641803315";
        const gameRole = "1021230808914206760";
        const customRole = "1105028550437904455";
        const hobbyRole = "951197274086723695";
        const warningRole = "1047622259155677364";
        const acceptRole = "937562805702393898";

        member.roles.add(introRole);
        member.roles.add(gameRole);
        member.roles.add(customRole);
        member.roles.add(hobbyRole);
        member.roles.add(warningRole);
        member.roles.add(acceptRole);
    }
}