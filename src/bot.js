require('dotenv').config();
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
client.commands = new Collection();
client.selectMenus = new Collection();
client.buttons = new Collection();
client.modals = new Collection();
client.voiceGenerator = new Collection()
client.adminStoreManageChannel = "";
client.commandArray = [];

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