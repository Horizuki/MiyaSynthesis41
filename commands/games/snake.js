const djsGames = require('djs-games')
const SnakeGame = new djsGames.SnakeGame()

module.exports = {
    name: 'snake',
    cooldowns: 10,
    permissions: [],
    emoji: "🐍",
    usage: "",
    description: 'con rắn nhưng trên discord', //lmfao
    execute(client, Discord, message, args) {
        SnakeGame.startGame(message)
    }
}