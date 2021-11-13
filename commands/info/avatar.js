

module.exports = {
  name: 'avatar',
  aliases: ['avt', 'pfp'],
  cooldowns: 2,
  emoji: "<:kuboava:882814211095429130>",
  usage: "[user]",
  permissions: [],
  description: 'Lấy avatar!',
  execute(client, Discord, message, args) {
    const user = message.mentions.users.first() || message.author;
    const avatar = new Discord.MessageEmbed()
      .setAuthor(user.username + "'s avatar")
      .setColor(message.member.displayHexColor)
      .setImage(user.avatarURL({dynamic : true}) + "?size=2048")
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic : true}))
    message.channel.send(avatar)
  }
};

