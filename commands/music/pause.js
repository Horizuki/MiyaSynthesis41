const { canModifyQueue } = require("../../util/Util");

module.exports = {
  name: "pause",
  emoji: "⏸️",
  usage: "",
  description: "Tạm ngưng nhạc đang phát",
  execute(client, Discord, message, cmd, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send(new Discord.MessageEmbed().setDescription("Hiện tại không phát bất kì bài nào.").setColor('RED')).catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (queue.playing) {
      queue.playing = false;
      queue.connection.dispatcher.pause(true);
      return queue.textChannel.send(`${message.author} ⏸ đã tạm ngưng phát nhạc.`).catch(console.error);
    }
  }
};
