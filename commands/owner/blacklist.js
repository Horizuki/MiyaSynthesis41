const db = require("quick.db");
const { MessageEmbed } = require('discord.js');//require the packages

module.exports = {
    name: 'blacklist',
    description: 'Blacklists a user from using the bot',
    aliases: ['block'],
    cooldown: 0,
    usage: 'blacklist <@user>',
    execute: async (client, Discord, message, cmd, args) => {
        if (message.author.id != process.env.OWNERID) return message.channel.send(new Discord.MessageEmbed().setDescription("Chỉ có người tạo ra tui mới có quyền sử dụng!").setColor('RED'))

        let user;
        if (message.mentions.users.first()) {
            user = message.mentions.users.first();
        } else if (args[0]) {
            user = message.guild.members.cache.get(args[0]).user;
        }

        if (!user) return message.channel.send(new Discord.MessageEmbed().setDescription("**Cậu quên mention ai đó này!**").setColor('RED'))
        let blacklist = db.get(`blacklist_${user.id}`)

        if (blacklist === null) {
            db.set(`blacklist_${user.id}`, 1);

            // const embed = new MessageEmbed()
            //     .setAuthor('Chào', client.user.displayAvatarURL())
            //     .setColor("000001")
            //     .setTitle('Bạn đã được đưa vào blacklist!')
            //     .setTimestamp()
            // user.send(embed)
            const blacklistUser = new MessageEmbed()
            .setColor("#33F304")
            .setDescription(`**Đã blacklist ${user}!**`)
            message.channel.send(blacklistUser)

        } else if (blacklist !== null) {
            message.channel.send(new Discord.MessageEmbed().setDescription(`**${user} đã bị blacklist trước đó.**`).setColor('RED'))
        } return;
    }
}