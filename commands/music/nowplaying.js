
const { splitBar } = require("string-progressbar");
const { MessageEmbed } = require("discord.js");



module.exports = {
  name: "np",
  emoji: "➡️",
  usage: "",
  aliases: ["nowplaying"],
  description: "Hiển thị nhạc đang phát",
  execute(client, Discord, message, cmd, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send(new Discord.MessageEmbed().setDescription("Hiện tại không phát bất kì bài nào.").setColor('RED')).catch(console.error);

    const song = queue.songs[0];
    const seek = (queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000;
    const left = song.duration - seek;

    let nowPlaying = new MessageEmbed()
      .setTitle("Đang phát")
      .setDescription(`${song.title}\n${song.url}`)
      .setColor("#F8AA2A")
      .setAuthor(message.client.user.username);

    if (song.duration > 0) {
      nowPlaying.addField(
        "\u200b",
        new Date(seek * 1000).toISOString().substr(11, 8) +
        "[" +
        splitBar(song.duration == 0 ? seek : song.duration, seek, 20)[0] +
        "]" +
        (song.duration == 0 ? " ◉ LIVE" : new Date(song.duration * 1000).toISOString().substr(11, 8)),
        false
      );
      nowPlaying.setFooter("Thời gian còn lại: " + new Date(left * 1000).toISOString().substr(11, 8));
    
    }

    return message.channel.send(nowPlaying);
  }
};