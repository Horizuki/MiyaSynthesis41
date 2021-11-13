const { canModifyQueue } = require("../../util/Util");

module.exports = {
  name: "volume",
  emoji: "🔊",
  usage: "<số>",
  aliases: ["vol"],
  description: "Điều chỉnh âm lượng",
  execute(client, Discord, message, cmd, args) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.channel.send(new Discord.MessageEmbed().setDescription("Hiện tại không phát bất kì bài nào.").setColor('RED')).catch(console.error);
    if (!canModifyQueue(message.member))
      return message.channel.send(new Discord.MessageEmbed().setDescription(`Bạn cần phải ở cùng voice với ${message.client.user}!`).setColor('RED')).catch(console.error);

    if (!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription(`🔊 Âm lượng hiện tại: **${queue.volume}%**`).setColor('RANDOM')).catch(console.error);
    if (isNaN(args[0])) return message.channel.send(new Discord.MessageEmbed().setDescription(`Hãy nhập số để chỉnh âm lượng.`).setColor('RED')).catch(console.error);
    if (Number(args[0]) > 100 || Number(args[0]) < 0 )
      return message.channel.send(new Discord.MessageEmbed().setDescription(`Làm ơn nhập số giữa 0 - 100.`).setColor('RED')).catch(console.error);

    queue.volume = args[0];
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

    return queue.textChannel.send(`Đã chỉnh âm lượng thành: **${args[0]}%**`).catch(console.error);
  }
};
