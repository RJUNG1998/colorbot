require('dotenv').config();
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { connect } = require('mongoose');
const fs = require('fs');

const client = new Client({ intents: [131071] });
client.commands = new Collection();
client.selectMenus = new Collection();
client.buttons = new Collection();
client.modals = new Collection();
// client.createdVoiceChannels = new Collection(); // autoVoiceChannel.js 전용
client.logTotalTime = new Collection();
client.commandArray = [];
client.expTable = new Collection();

//경험치 테이블 셋업
/** 
 * Colletion = { 
 *      level => [XP needed to level up, Total xp required]
 * }
 * */
let totalExp = 0
for (let i = 0; i < 101; i++) {
    let exp = 5 * (Math.pow(i, 2)) + (50 * i) + 100
    client.expTable.set(i, [exp, totalExp])
    totalExp += exp
}


//핸들러
const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith(".js"));
    for (const file of functionFiles){
        require(`./functions/${folder}/${file}`)(client);
    }
};
client.handleEvents();
client.handleCommands();
client.handleComponents();

client.login(process.env.TOKEN);
(async () => {
    await connect(process.env.DATABASE_TOKEN).catch(console.error);
})();