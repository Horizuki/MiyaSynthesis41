

module.exports = {
    name: 'test',
    permissions: [],
    cooldowns: 0,
    description: 'Thử lệnh',
    execute(client, Discord, message, args) {
        let test = new Discord.MessageEmbed()
            .setTitle("Click here!")
            .setColor("RANDOM")
            .setURL("https://www.youtube.com/watch?v=JB3INq8n9is")
        message.channel.send(test);
    }
}
