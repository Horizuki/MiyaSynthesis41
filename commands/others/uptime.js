
module.exports = {
    name: 'uptime',
    cooldowns: 10,
    permissions: [],
    emoji: "<a:yaygif:735060319746916352>",
    usage: "",
    aliases: ['ut'],
    description: 'Xem thời gian Miya chạy',
    execute(client, Discord, message, cmd, args) {
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        let uptime = `Tui đã chạy được ${days} ngày, ${hours} giờ, ${minutes} phút và ${seconds} giây`;
        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(uptime)
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
        message.channel.send(embed);
    }
}