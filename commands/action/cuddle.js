const API = require('anime-images-api')
const images_api = new API()

module.exports = {
    name: 'cuddle',
    cooldowns: 5,
    emoji: "<a:cuddle:882803485400252476>",
    usage: "<user>",
    permissions: [],
    description: 'nựng người khác',
    execute(client, Discord, message, cmd, args) {
        const user = client.getUser(message, args) || message.author;
        images_api.sfw.cuddle().then(response => {

        const embed = new Discord.MessageEmbed()
            .setTitle(`\`${message.author.tag}\` đã nựng ${message.author.id === user.id ? "chính bản thân" : `\`${user.tag}\``}`)
            .setColor("RANDOM")
            .setImage(response.image)
            .setTimestamp();
        return message.channel.send(embed)
    })
}
}