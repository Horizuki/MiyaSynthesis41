const { canModifyQueue } = require("../../util/Util");

module.exports = {
  name: "loop",
  emoji: "🔁",
  usage: "",
  aliases: ["repeat"],
  description: "Chế độ lặp lại",
  execute(client, Discord, message, cmd, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send(new Discord.MessageEmbed().setDescription("Hiện tại không phát bất kì bài nào.").setColor('RED')).catch(console.error);

    if (!canModifyQueue(message.member)) return;

    // toggle from false to true and reverse
    queue.loop = !queue.loop;
    return queue.textChannel.send(`Chế độ lặp lại đang được ${queue.loop ? "**bật**" : "**tắt**"}`).catch(console.error);
  }
};
