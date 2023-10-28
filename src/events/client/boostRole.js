const User = require('../../schemas/user')

module.exports = {
    name: 'guildMemberUpdate',
    async execute(oldMember, newMember, client) {
        const oldRoles = oldMember.roles.cache, newRoles = newMember.roles.cache;
        if (!oldRoles.has('953726054038646844') && newRoles.has('953726054038646844')) {
            console.log('핑크 추가')
            const storedUser = await client.fetchUser(
                newMember.id,
                newMember.guild.id
            );
            const backgroundInv = storedUser.profileSource.backgroundInventory;
            if (!backgroundInv.includes('boost')){
                backgroundInv.push('boost')
            }
            await User.findOneAndUpdate(
                { _id: storedUser._id },
                {
                    'profileSource.background': 'boost',
                    'profileSource.backgroundInventory': backgroundInv
                }
            )

        }
    }
}