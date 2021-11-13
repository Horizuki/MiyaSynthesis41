const { canModifyQueue } = require("../../util/Util");

module.exports = {
  name: "stop",
  emoji: "⏹️",
  usage: "",
  aliases: ['leave'],
  description: "Dừng nhạc",
  execute(client, Discord, message, cmd, args) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.channel.send(new Discord.MessageEmbed().setDescription("Hiện tại tui không phát bất kì bài nào.").setColor('RED')).catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.songs = [];
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏹ đã dừng phát nhạc!`).catch(console.error);
  }
};
