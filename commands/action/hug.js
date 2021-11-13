const API = require('anime-images-api')
const images_api = new API()

module.exports = {
    name: 'hug',
    cooldowns: 5,
    emoji: "<a:konhug:882803107225026662>",
    usage: "<user>",
    permissions: [],
    description: 'ôm người khác',
    execute(client, Discord, message, cmd, args) {
        const user = client.getUser(message, args) || message.author;
        images_api.sfw.hug().then(response => {

        const embed = new Discord.MessageEmbed()
            .setTitle(`\`${message.author.tag}\` đã ôm ${message.author.id === user.id ? "bản thân" : `\`${user.tag}\``}`)
            .setColor("RANDOM")
            .setImage(response.image)
            .setTimestamp();
        return message.channel.send(embed)
    })
}
}