const djsGames = require('djs-games')
const ConnectFour = new djsGames.ConnectFour()


module.exports = {
    name: 'connectfour',
    cooldowns: 10,
    permissions: [],
    emoji: ":four:",
    usage: "<user>",
    aliases: ['cf', 'c4', 'connect4'],
    description: 'connectfour',
    execute(client, Discord, message, cmd, args) {
        ConnectFour.startGame(message)
    }
}