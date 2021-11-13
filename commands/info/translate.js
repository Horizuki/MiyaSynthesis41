const Discord = require('discord.js');
const translate = require("@iamtraction/google-translate");

module.exports = {
  name: 'translate',
  permissions: [],
  aliases: ["trans"],
  emoji: "🔄",
  usage: "<iso code> <message>",
  cooldowns: 5,
  description: 'dịch mọi ngôn ngữ sang mọi ngôn ngữ!',
  async execute(client, Discord, message, cmd, args) {
    const txt = args.slice(1).join(" ")
    const lang = args[0]
    if (!lang) {
      const embed = new Discord.MessageEmbed()
        .setDescription(`Vui lòng cung cấp mã ISO! Nếu bạn không biết nó là gì, thì **[nhấn vào đây](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)**`)
        .setColor('RED')
      return message.channel.send(embed)
    }
    if (!txt) {
      const embed = new Discord.MessageEmbed()
        .setDescription(`Làm ơn nhập chính xác mã ISO!`)
        .setColor('RED')
      return message.channel.send(embed)
    }

    translate(txt, { to: lang }).then(res => {
      const translateEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("__Miya The Translator__")
        .addField("Text:", txt)
        .addField("Translation:", res.text)
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic : true}))
        .setTimestamp()
      message.delete()
      message.channel.send(translateEmbed);
    }).catch(err => {
      message.channel.send(new Discord.MessageEmbed().setDescription(`Vui lòng cung cấp mã ISO! Nếu bạn không biết nó là gì, thì **[nhấn vào đây](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)**`).setColor("RED"))
    });
  },
};