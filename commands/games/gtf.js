const { GTF } = require('djs-games')
require('dotenv').config();

module.exports = {
    name: 'gtf',
    cooldowns: 7,
    permissions: [],
    emoji: "🏳️",
    usage: "",
    aliases: ["guesstheflag"],
    description: 'đoán cờ', //lmfao
    execute(client, Discord, message, cmd, args) {

        const game = new GTF({
            message: message,
            token: process.env.GAMEID, // *Required!! Get Your Api Token at https://dagpi.xyz/dashboard 
            stopCommand: "stop", // *Required!!
            winFooter: "You Win!", // Set The Footer of the win message
            winColor: "GREEN", // The embed color of the win message
            loseFooter: "You Lose!", // Set The Footer of the lose message
            loseColor: "RED", // The embed color of the lose message
            questionFooter: "Guess the Flag!", // Set The Footer of the question message
            questionColor: "#fce9ed", // The embed color of the question message
        })
        game.start()

    }
}