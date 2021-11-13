const { canModifyQueue } = require("../../util/Util");

module.exports = {
  name: "shuffle",
  emoji: "🔀",
  usage: "",
  description: "Trộn hàng chờ",
  execute(client, Discord, message, cmd, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send(new Discord.MessageEmbed().setDescription("Hiện tại không phát bất kì bài nào.").setColor('RED')).catch(console.error);
    if (!canModifyQueue(message.member)) return;

    let songs = queue.songs;
    for (let i = songs.length - 1; i > 1; i--) {
      let j = 1 + Math.floor(Math.random() * i);
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    queue.songs = songs;
    message.client.queue.set(message.guild.id, queue);
    queue.textChannel.send(`${message.author} 🔀 đã trộn hàng chờ.`).catch(console.error);
  }
};
