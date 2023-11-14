module.exports = {
    data: {
        name: `supportsupportexit`
    },

    async execute(interaction, client) {
        await interaction.channel.delete()
    }
}
