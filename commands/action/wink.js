const API = require('anime-images-api')
const images_api = new API()

module.exports = {
    name: 'wink',
    cooldowns: 5,
    emoji: "<:RemWink:882804051484504124>",
    usage: "<user>",
    permissions: [],
    description: 'wink wink wink',
    execute(client, Discord, message, cmd, args) {
        const user = client.getUser(message, args) || message.author;
        images_api.sfw.wink().then(response => {

        const embed = new Discord.MessageEmbed()
            .setTitle(`\`${message.author.tag}\` đã nháy mắt`)
            .setColor("RANDOM")
            .setImage(response.image)
            .setTimestamp();
        return message.channel.send(embed)
    })
}
}