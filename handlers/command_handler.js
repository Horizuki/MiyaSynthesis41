const fs = require('fs');

module.exports = (client, Discord) => {

    const categories = fs.readdirSync('./commands/');
    for (const category of categories) {
        const commandFiles = fs.readdirSync(`./commands/${category}`).filter(File => File.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(`../commands/${category}/${file}`);
            if (command.name) {
                client.commands.set(command.name, command);
            } else {
                continue
            }
        }
    }
}