const { canModifyQueue } = require("../../util/Util");
const pattern = /^[0-9]{1,2}(\s*,\s*[0-9]{1,2})*$/g;

module.exports = {
  name: "remove",
  emoji: "↔️",
  description: "Xoá nhạc ra khỏi hàng chờ",
  execute(client, Discord, message, cmd, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send(new Discord.MessageEmbed().setDescription("Không có nhạc trong hàng chờ.").setColor('RED')).catch(console.error);
    if (!canModifyQueue(message.member)) return;
    if (!args.length) return message.channel.send(new Discord.MessageEmbed().setDescription(`Cách sử dụng: ${process.env.PREFIX}remove <số thứ tự>`).setColor('RED'));

    const arguments = args.join("");
    const songs = arguments.split(",").map((arg) => parseInt(arg));

    let removed = [];
    
    if (pattern.test(arguments) && songs.every((songIndex) => songIndex < queue.songs.length)) {
      queue.songs = queue.songs.filter((item, index) => {if (songs.find((songIndex) => songIndex - 1 == index)) removed.push(item);
        else return true;
      });

      queue.textChannel.send(
        `${message.author} ❌ đã xoá **${removed.map((song) => song.title).join("\n")}** ra khỏi hàng chờ.`
      );
    } else if (!isNaN(args[0]) && args[0] >= 1 && args[0] <= queue.songs.length) {
      return queue.textChannel.send(
        `${message.author} ❌ đã xoá **${queue.songs.splice(args[0] - 1, 1)[0].title}** ra khỏi hàng chờ.`
      );
    } else {
      return message.reply('test');
    }
  }
};