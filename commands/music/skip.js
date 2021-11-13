const { canModifyQueue } = require("../../util/Util");

module.exports = {
  name: "skip",
  emoji: "➡️",
  usage: "",
  description: "Bỏ qua bài đang được phát",
  execute(client, Discord, message, cmd, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return message.channel.send(new Discord.MessageEmbed().setDescription("Hiện tại không phát bài nào để tui có thể skip.").setColor('RED')).catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.playing = true;
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏭ đã skip bài hát.`).catch(console.error);
  }
};
