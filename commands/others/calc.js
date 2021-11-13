const simplydjs = require('simply-djs')

module.exports = {
    name: "calculator",
    aliases: ['calc'],
    emoji: "🔧",
    usage: "",
    description: 'Máy tính',
    async execute(client, Discord, message, cmd, args) {
        simplydjs.calculator(message, {
            embedColor: '#fce9ed', //default: #075FFF
            credit: false,
        })
    }
}