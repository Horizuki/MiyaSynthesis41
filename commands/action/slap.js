const API = require('anime-images-api')
const images_api = new API()

module.exports = {
    name: 'slap',
    cooldowns: 5,
    emoji: "<a:ChikaSlap:882803946920501258>",
    usage: "<user>",
    permissions: [],
    description: 'vả người ta',
    execute(client, Discord, message, cmd, args) {
        const user = client.getUser(message, args) || message.author;
        images_api.sfw.slap().then(response => {

        const embed = new Discord.MessageEmbed()
            .setTitle(`\`${message.author.tag}\` đã vả ${message.author.id === user.id ? "chính bản thân" : `\`${user.tag}\``}`)
            .setColor("RANDOM")
            .setImage(response.image)
            .setTimestamp();
        return message.channel.send(embed)
    })
}
}