const User = require('../src/schemas/user')

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
        if (message.content === "잠시업데이트입니다뷁") {
            console.log("뷁")
            await User.updateMany({}, {
                "exp": {
                    "chat": 0,
                    "voice": 0,
                    "chatTotal": 0,
                    "voiceTotal": 0,
                    "chatLevel": 0,
                    "voiceLevel": 0
                }
            })
        }

        const today = new Date();
        
        if (Number(today) - Number(storedUser.cooldown.chat) > 60000) {
            if (await storedUser.exp.chat+1 >= client.expTable.get(await storedUser.exp.chatLevel)[0]) { //level up
                //TODO: output embed for congrat level up
                await User.findOneAndUpdate(
                    { _id: storedUser._id },
                    {
                        'exp.chatLevel': await storedUser.exp.chatLevel + 1,
                        'exp.chat': 0,
                        // balance: await storedUser.balance + client.expTable.get(storedUser.exp.voiceLevel)[0]
                    }
                )
            }
            await User.findOneAndUpdate(
                { _id: storedUser._id },
                { 
                    'cooldown.chat': today,
                    // balance: await storedUser.balance + AMOUNT,
                    'exp.chat': await storedUser.exp.chat + 1,
                    'exp.chatTotal': await storedUser.exp.chatTotal + 1
                }
            )
        }
    }
}