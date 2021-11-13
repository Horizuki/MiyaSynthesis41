const { play } = require("../../include/play");
const ytdl = require("ytdl-core");
const YouTubeAPI = require("simple-youtube-api");
const scdl = require("soundcloud-downloader").default;
const https = require("https");
const { YOUTUBE_API_KEY, SOUNDCLOUD_CLIENT_ID, DEFAULT_VOLUME } = require("../../util/Util");
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);

module.exports = {
  name: "play",
  cooldown: 3,
  emoji: "▶️",
  usage: "<tên bài hát> | <url>",
  aliases: ["p"],
  description: "Phát bài hát từ YouTube",
  async execute(client, Discord, message, cmd, args) {
    const { channel } = message.member.voice;

    const serverQueue = message.client.queue.get(message.guild.id);
    if (!channel) return message.channel.send(new Discord.MessageEmbed().setDescription("Bạn cần phải ở trong voice để thực hiện hành động này!").setColor('RED')).catch(console.error);
    if (serverQueue && channel !== message.guild.me.voice.channel) return message.channel.send(new Discord.MessageEmbed().setDescription(`Bạn cần phải ở cùng voice với ${message.client.user}!`).setColor('RED')).catch(console.error);

    if (!args.length) return message.channel.send(new Discord.MessageEmbed().setDescription(`Cách sử dụng: ${process.env.PREFIX}play <YouTube URL | Tên bài hát>`).setColor('RED')).catch(console.error);

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT")) return message.channel.send(new Discord.MessageEmbed().setDescription(`Tui hong có quyền \`CONNECT\` nối đến voice này.`).setColor('RED'))
    if (!permissions.has("SPEAK")) return message.channel.send(new Discord.MessageEmbed().setDescription(`Tui hong có quyền \`SPEAK\` để phát nhạc.`).setColor('RED'))

    const search = args.join(" ");
    const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
    const playlistPattern = /^.*(list=)([^#\&\?]*).*/gi;
    const scRegex = /^https?:\/\/(soundcloud\.com)\/(.*)$/;
    const mobileScRegex = /^https?:\/\/(soundcloud\.app\.goo\.gl)\/(.*)$/;
    const url = args[0];
    const urlValid = videoPattern.test(args[0]);

    // Start the playlist if playlist url was provided
    if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
      return message.client.commands.get("playlist").execute(message, args);
    } else if (scdl.isValidUrl(url) && url.includes("/sets/")) {
      return message.client.commands.get("playlist").execute(message, args);
    }

    if (mobileScRegex.test(url)) {
      try {
        https.get(url, function (res) {
          if (res.statusCode == "302") {
            return message.client.commands.get("play").execute(message, [res.headers.location]);
          } else {
            return message.channel.send(new Discord.MessageEmbed().setDescription("Không tìm thấy nội dung từ url.").setColor('RED')).catch(console.error);
          }
        });
      } catch (error) {
        console.error(error);
        return message.reply(error.message).catch(console.error);
      }
      return message.channel.send(new Discord.MessageEmbed().setDescription("Đang chuyển hướng đến URL...").setColor('#F30B04')).catch(console.error);
    }

    const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      loop: false,
      volume: DEFAULT_VOLUME || 100,
      playing: true
    };

    let songInfo = null;
    let song = null;

    if (urlValid) {
      try {
        songInfo = await ytdl.getInfo(url);
        song = {
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url,
          duration: songInfo.videoDetails.lengthSeconds
        };
      } catch (error) {
        console.error(error);
        return message.reply(error.message).catch(console.error);
      }
    } else if (scRegex.test(url)) {
      try {
        const trackInfo = await scdl.getInfo(url, SOUNDCLOUD_CLIENT_ID);
        song = {
          title: trackInfo.title,
          url: trackInfo.permalink_url,
          duration: Math.ceil(trackInfo.duration / 1000)
        };
      } catch (error) {
        console.error(error);
        return message.reply(error.message).catch(console.error);
      }
    } else {
      try {
        const results = await youtube.searchVideos(search, 1, { part: "snippet" });
        // PATCH 1 : avoid cases when there are nothing on the search results.
        if (results.length <= 0) {
          // No video results.
          message.reply(("play.songNotFound")).catch(console.error);
          return;
        }
        songInfo = await ytdl.getInfo(results[0].url);
        song = {
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url,
          duration: songInfo.videoDetails.lengthSeconds
        };
      } catch (error) {
        console.error(error);
        return message.reply(error.message).catch(console.error);
      }
    }

    if (serverQueue) {
      serverQueue.songs.push(song);
      return serverQueue.textChannel
        .send(`✅ **${song.title}** đã được thêm vào hàng chờ bởi ${message.author}.`)
        .catch(console.error);
    }

    queueConstruct.songs.push(song);
    message.client.queue.set(message.guild.id, queueConstruct);

    try {
      queueConstruct.connection = await channel.join();
      await queueConstruct.connection.voice.setSelfDeaf(true);
      play(queueConstruct.songs[0], message);
    } catch (error) {
      console.error(error);
      message.client.queue.delete(message.guild.id);
      await channel.leave();
      return message.channel.send(new Discord.MessageEmbed().setDescription(`Không thể vào voice: ${error}`).setColor('RED')).catch(console.error);
    }
  }
};
