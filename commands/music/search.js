const { MessageEmbed } = require("discord.js");
const YouTubeAPI = require("simple-youtube-api");
const { YOUTUBE_API_KEY } = require("../../util/Util");
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);

module.exports = {
  name: "search",
  emoji: "⏺️",
  usage: "<tên bài hát>",
  description: "Tìm kiếm nhạc",
  async execute(client, Discord, message, cmd, args) {
    if (!args.length) return message.channel.send(new Discord.MessageEmbed().setDescription(`Cách sử dụng: ${process.env.PREFIX}${module.exports.name} <tên video>`).setColor('RED')).catch(console.error);
    if (message.channel.activeCollector) return message.reply("đã có sẵn tìm kiếm được sử dụng!");
    if (!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed().setDescription("Bạn cần phải ở trong voice để thực hiện hành động này!").setColor('RED')).catch(console.error);
    const search = args.join(" ");

    let resultsEmbed = new MessageEmbed()
      .setTitle(`**Nhập số của tìm kiếm mà bạn muốn phát**`)
      .setDescription(`Hiển thị kết quả cho: ${search}`)
      .setColor("#F8AA2A");

    try {
      const results = await youtube.searchVideos(search, 10);
      results.map((video, index) => resultsEmbed.addField(video.shortURL, `${index + 1}. ${video.title}`)); 

      let resultsMessage = await message.channel.send(resultsEmbed);

      function filter(msg) {
        const pattern = /^[0-9]{1,2}(\s*,\s*[0-9]{1,2})*$/;
        return pattern.test(msg.content);
      }

      message.channel.activeCollector = true;
      const response = await message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ["time"] });
      const reply = response.first().content;

      if (reply.includes(",")) {
        let songs = reply.split(",").map((str) => str.trim());

        for (let song of songs) {
          await message.client.commands
            .get("play")
            .execute(message, [resultsEmbed.fields[parseInt(song) - 1].name]);
        }
      } else {
        const choice = resultsEmbed.fields[parseInt(response.first()) - 1].name;
        message.client.commands.get("play").  execute(message, [choice]);
      }

      message.channel.activeCollector = false;
      resultsMessage.delete().catch(console.error);
      response.first().delete().catch(console.error);
    } catch (error) {
      console.error(error);
      message.channel.activeCollector = false;
      message.reply(error.message).catch(console.error);
    }
  }
};
