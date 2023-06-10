require('dotenv').config();
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { connect } = require('mongoose');
const fs = require('fs');

const client = new Client({ intents: [131071] });
client.commands = new Collection();
client.selectMenus = new Collection();
client.buttons = new Collection();
client.modals = new Collection();
client.logTotalTime = new Collection();
client.commandArray = [];
client.expTable = new Collection();
client.heartTable = new Map([
    ['gray', '1087251326171349092'],
    ['red', '952771282133463170'],
    ['orange', '937598204713775126'],
    ['yellow', '970471835944775720'],
    ['green', '970472217337020426'],
    ['blue', '970472530903191653'],
    ['purple', '1013129724282818600'],
]);
client.test = []

//경험치 테이블 셋업
/** 
 * Colletion = { 
 *      level => [XP needed to level up, Total xp required]
 * }
 * */
let totalExp = 0
for (let i = 0; i < 101; i++) {
    let exp = 5 * (Math.pow(i, 2)) + (50 * i) + 100
    let role;
    if (i < 5) {
        role = 'gray'
    } else if (i < 15) {
        role = 'red'
    } else if (i < 30) {
        role = 'orange'
    } else if (i < 45) {
        role = 'yellow'
    } else if (i < 60) {
        role = 'green'
    } else if (i < 75) {
        role = 'blue'
    } else {
        role = 'purple'
    }
    client.expTable.set(i, [exp, totalExp, role])
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