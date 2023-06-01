const User = require('../../schemas/user')

module.exports = {
    name: "messageCreate",
    async execute(message, client) {
        if (message.author.bot) return;

        const AMOUNT = 5
        const storedUser = await client.fetchUser(
            message.author.id,
            message.guild.id
        );

        // /**
        //  * 데이터베이스 새로운 데이터 넣을때
        //  **/
        // if (message.content === "잠시업데이트입니다뷁") {
        //     console.log("뷁")
        //     await User.updateMany({}, {$set: {
        //         "exp": {
        //             "chat": 0,
        //             "voice": 0,
        //             "chatTotal": 0,
        //             "voiceTotal": 0,
        //             "chatLevel": 0,
        //             "voiceLevel": 0
        //         }
        //     }})
        // }
        
        /**
         * 데이터베이스 데이터 업데이트 할때
         **/
        // if (message.content === "잠시업데이트입니다뷁") {
        //     console.log("뷁")
        //     await User.updateMany({}, {
        //         "profileSource.achievement": 'beginner'
        //     })
        // }

        // if (message.content === "업데이트입니다뷁") {
        //     console.log('뷁')
        //     const tmpStoredUser = await User.find({})

        //     for(const data of tmpStoredUser) {
        //         await User.findOneAndUpdate(
        //             { _id: data._id },
        //             {
        //                 'profileSource.profileBorder': `profile_border_${client.expTable.get(data.exp.voiceLevel)[2]}`,
        //                 'profileSource.profileNameBar': `profile_name_bar_${client.expTable.get(data.exp.voiceLevel)[2]}`,
        //                 'profileSource.background': `background_${client.expTable.get(data.exp.voiceLevel)[2]}`,
        //             }
        //         )
        //         // if (message.guild.members.cache.has(data.userId)) {

        //             // let member = await message.guild.members.fetch(data.userId);
        //             // if (member.roles.cache.has("953726054038646844")) {
        //             //     console.log(data.userId, member.displayName)
        //             //     const tmp = data.profileSource.backgroundInventory.filter(elem => elem !== 'background_boost');
        //             //     tmp.push('background_boost')
        //             //     await User.findOneAndUpdate(
        //             //         { _id: data._id },
        //             //         {
        //             //             'profileSource.background': 'background_boost',
        //             //             'profileSource.backgroundInventory': tmp
        //             //         }
        //             //     )
        //             // }
        //             // // console.log("yes", data.userId, member.displayName)
        //             // await User.findOneAndUpdate(
        //             //     { _id: data._id },
        //             //     {
        //             //         'exp.voice': 0,
        //             //         'exp.voiceTotal': client.expTable.get(data.exp.voiceLevel)[1]
        //             //     }
        //             // )
        //             // console.log(data.userId, 'success')
        //         // }
                
        //     }
        //     console.log("done")
        // }

        const today = new Date();
        
        if (Number(today) - Number(storedUser.cooldown.chat) > 60000) {
            await User.findOneAndUpdate(
                { _id: storedUser._id },
                { 
                    'cooldown.chat': today,
                    balance: await storedUser.balance + AMOUNT,
                    'exp.chatTotal': await storedUser.exp.chatTotal + 1
                }
            )
        }
    }
}