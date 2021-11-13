const API = require('anime-images-api')
const images_api = new API()

module.exports = {
    name: 'pat',
    cooldowns: 5,
    emoji: "<:pat:882803848413081661>",
    usage: "<user>",
    permissions: [],
    description: 'xoa đầu',
    execute(client, Discord, message, cmd, args) {
        const user = client.getUser(message, args) || message.author;
        images_api.sfw.pat().then(response => {

        const embed = new Discord.MessageEmbed()
            .setTitle(`\`${message.author.tag}\` đã xoa đầu ${message.author.id === user.id ? "chính bản thân" : `\`${user.tag}\``}`)
            .setColor("RANDOM")
            .setImage(response.image)
            .setTimestamp();
        return message.channel.send(embed)
    })
}
}