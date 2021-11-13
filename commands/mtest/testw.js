module.exports = {
    name: 'testw',
    cooldowns: 0,
    permissions: [],
    desc: 'testw',
    execute(client, Discord, message, args) {
        message.channel.send(new Discord.MessageEmbed().setDescription('<a:Mira:816260312025399346>').setColor('#ffddf4'))
    }
}