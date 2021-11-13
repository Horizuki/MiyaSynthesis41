const djsGames = require('djs-games')
const guessTheNumber = new djsGames.GuessTheNumber()


module.exports = {
    name: 'guessnumber',
    cooldowns: 10,
    permissions: [],
    emoji: "🔢",
    usage: "",
    aliases: ["gn"],
    description: 'đoán số', //lmfao
    execute(client, Discord, message, cmd, args) {
        guessTheNumber.startGame(message)
    }
}