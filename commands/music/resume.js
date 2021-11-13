const { canModifyQueue } = require("../../util/Util");

module.exports = {
  name: "resume",
  aliases: ["r"],
  emoji: "↗️",
  usage: "",
  description: "Tiếp tục bài đang tạm ngưng",
  execute(client, Discord, message, cmd, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send(new Discord.MessageEmbed().setDescription("Hiện tại không phát bất kì bài nào.").setColor('RED')).catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!queue.playing) {
      queue.playing = true;
      queue.connection.dispatcher.resume();
      return queue.textChannel.send(`${message.author} ▶  đã tiếp tục phát nhạc!`).catch(console.error);
    }

    return message.channel.send(new Discord.MessageEmbed().setDescription("Bài hát không bị tạm ngưng trước đó.").setColor('RED')).catch(console.error);
  }
};
