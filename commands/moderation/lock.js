

module.exports = {
  name: "lock",
  permissions: ["MANAGE_CHANNELS"],
  emoji: "🔒",
  description: "khoá channel",
  usage: "",
  async execute(client, Discord, message, cmd, args) {
    if (!message.guild.me.permissions.has("MANAGE_CHANNELS"))
      return message.channel.send(new Discord.MessageEmbed().setDescription(`Miya không có \`MANAGE_CHANNELS\` để sử dụng lệnh này!`).setColor('RED'))

    if (args[0] !== "all") {
      if (!args[0])
        return (
          message.channel.updateOverwrite(
            message.channel.guild.roles.everyone,
            {
              SEND_MESSAGES: false
            },
            message.author.tag
          ) &&
          message.channel.send(new Discord.MessageEmbed().setDescription("**Đã khoá** <#" + message.channel + ">!").setColor('GREEN'))
        );
    }
  }
};
