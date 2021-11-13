

module.exports = {
  name: "unlock",
  emoji: "🔓",
  description: "Mở khoá channel",
  usage: "",
  async execute(client, Discord, message, cmd, args) {
    if (!message.guild.me.permissions.has("MANAGE_CHANNELS"))
      return message.channel.send(new Discord.MessageEmbed().setDescription(`Miya không có \`${invalidPerms}\` để sử dụng lệnh này!`).setColor('RED'))
    if (!message.member.permissions.has("MANAGE_CHANNELS"))
      return message.channel.send(new Discord.MessageEmbed().setDescription(`Bạn không có \`${invalidPerms}\` để sử dụng lệnh này!`).setColor('RED'))
    if (args[0] !== "all") {
      if (!args[0])
        return (
          message.channel.updateOverwrite(
            message.channel.guild.roles.everyone,
            {
              SEND_MESSAGES: true
            },
            message.author.tag
          ) &&
          message.channel.send(new Discord.MessageEmbed().setDescription("**Đã mở khoá** <#" + message.channel + ">!").setColor('GREEN'))

        );
    }
  }
};
