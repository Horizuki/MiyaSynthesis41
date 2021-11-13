const API = require('anime-images-api')
const images_api = new API()

module.exports = {
    name: 'kill',
    cooldowns: 5,
    emoji: "💀",
    usage: "<user>",
    permissions: [],
    description: 'kill',
    execute(client, Discord, message, cmd, args) {
        const user = client.getUser(message, args) || message.author;
        images_api.sfw.kill().then(response => {

        const embed = new Discord.MessageEmbed()
            .setTitle(`\`${message.author.tag}\` đã giết ${message.author.id === user.id ? "chính bản thân" : `\`${user.tag}\``}`)
            .setColor("RANDOM")
            .setImage(response.image)
            .setTimestamp();
        return message.channel.send(embed)
    })
}
}