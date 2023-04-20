const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const fs = require('fs');

module.exports = (client) => {
    client.handleCommands = async () => {
        const commandFolders = fs.readdirSync('./src/commands');
        for (const folder of commandFolders) {
            const commandFiles = fs
                .readdirSync(`./src/commands/${folder}`)
                .filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                client.commands.set(command.data.name, command);
                client.commandArray.push(command.data.toJSON());
                console.log(`Command: ${command.data.name} has been passed through the handler`);
            }
        }

        const rest = new REST({version:"10"}).setToken(process.env.TOKEN);
        try {
            console.log("Started refreshing application (/) commands.");
            await rest.put(Routes.applicationCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {
                body: []
            });
            await rest.put(Routes.applicationCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {
                body: client.commandArray
            });
        } catch (error) {
            console.error(error);
        }
    };
};