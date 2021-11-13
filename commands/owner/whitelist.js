const db = require("quick.db");//require the packages
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'whitelist',
  category: 'Dev',
  description: 'Whitelist a user',
  cooldown: 0,
  aliases: ['unblock'],
  usage: 'whitelist <@user>',
  execute: async (client, Discord, message, cmd, args) => {//everyone haves different execute parameters
    if (message.author.id != process.env.OWNERID) return message.channel.send(new Discord.MessageEmbed().setDescription("Chỉ có người tạo ra tui mới có quyền sử dụng!").setColor('RED'))

    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else if (args[0]) {
      user = message.guild.members.cache.get(args[0]).user;
    }

    if (!user) return message.channel.send(new Discord.MessageEmbed().setDescription("**Cậu quên mention ai đó này!**").setColor('RED'))

    let blacklist = db.get(`blacklist_${user.id}`)

    if (blacklist === 0 || blacklist === null) return message.channel.send(new Discord.MessageEmbed().setDescription(`**${user} không có trong danh sách blacklist.**`).setColor('RED'))

    // const embed = new MessageEmbed()
    // .setAuthor('Hype', client.user.displayAvatarURL())
    // .setTitle('Blacklisted!')
    // .setDescription('Damn, It looks like you have been blacklisted from the bot... sad')
    // .setTimestamp()
    // user.send(embed)
    const whitelistUser = new MessageEmbed()
      .setColor("#33F304")
      .setDescription(`**Đã whitelist ${user}!**`)
    message.channel.send(whitelistUser)
    db.delete(`blacklist_${user.id}`, 1)//here you delete the "blacklist" status from the database
  }
}