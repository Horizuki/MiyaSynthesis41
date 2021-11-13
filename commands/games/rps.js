
const simplydjs = require('simply-djs')

module.exports = {
    name: 'rps',
    aliases: ["rockpaperscissors"],
    cooldowns: 10,
    emoji: "✂️",
    usage: "<user>",
    permissions: [],
    description: 'đấm kéo bao', //lmfao
    execute(client, Discord, message, args) {
        // RPS command
        simplydjs.rps(message, {
                    embedColor: "#fce9ed", // default: #075FFF
                    // timeoutEmbedColor: "hex code", // default: #c90000
                    // drawEmbedColor: "hex code", // default: #075FFF
                    // winEmbedColor: "hex code", // default: #06bd00
                    embedFooter: "Đấm kéo bao",
                    // rockColor: "colors", // default: grey
                    // paperColor: "colors", // default: grey
                    // scissorsColor: "colors", // default: grey
                    credit: false,
                })
    }
}