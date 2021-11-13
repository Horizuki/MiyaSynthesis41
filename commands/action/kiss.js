const API = require('anime-images-api')
const images_api = new API()

module.exports = {
    name: 'kiss',
    cooldowns: 5,
    emoji: "<:kissu:882803732260216864>",
    usage: "<user>",
    permissions: [],
    description: 'hôn người khác',
    execute(client, Discord, message, cmd, args) {
        const user = client.getUser(message, args) || message.author;
        images_api.sfw.kiss().then(response => {

        const embed = new Discord.MessageEmbed()
            .setTitle(`\`${message.author.tag}\` đã hôn ${message.author.id === user.id ? "bản thân" : `\`${user.tag}\``}`)
            .setColor("RANDOM")
            .setImage(response.image)
            .setTimestamp();
        return message.channel.send(embed)
    })
}
}