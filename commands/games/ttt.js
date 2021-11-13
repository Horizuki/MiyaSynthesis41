const simplydjs = require('simply-djs')

module.exports = {
    name: 'tictactoe',
    cooldowns: 10,
    permissions: [],
    emoji: "🔴",
    usage: "<user>",
    aliases: ['ttt', '3t'],
    description: 'tictactoe',
    execute(client, Discord, message, cmd, args) {
        simplydjs.tictactoe(client, message, {
    xEmoji: '❌', //default: ❌
    oEmoji: '⭕', //default: ⭕
    idleEmoji: '➖', //default: ➖
    embedColor: '#fce9ed', //default: #075FFF
    credit: false
    // embedFoot: 'text for footer' //default: 'Make sure to win ;)' 
}) 
    }
}