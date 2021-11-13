const djsGames = require('djs-games')
const FastTyper = new djsGames.FastTyper()


module.exports = {
    name: 'fasttyper',
    cooldowns: 10,
    permissions: [],
    emoji: "⌨️",
    usage: "",
    aliases: ['ft'],
    description: 'ai là anh hùng bàn phím!',
    execute(client, Discord, message, cmd, args) {
        FastTyper.startGame(message)
    }
}