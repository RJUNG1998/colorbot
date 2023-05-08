const chalk = require("chalk");

module.exports = {
    name: "connecting",
    async execute(client) {
        console.log(chalk.green("[Database Status]: Connecting..."))
    }
}