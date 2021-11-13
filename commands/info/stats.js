const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const { stripIndent } = require('common-tags');

module.exports = {
  name: 'stats',
  emoji: "📊",
  usage: "",
  description: "Thông số của Miya",
    async execute(client, Discord, message, cmd, args) {
        
    const d = moment.duration(client.uptime);
    const days = (d.days() == 1) ? `${d.days()} ngày` : `${d.days()} ngày`;
    const hours = (d.hours() == 1) ? `${d.hours()} giờ` : `${d.hours()} giờ`;
    const seconds = (d.seconds() == 1) ? `${d.seconds()} giây` : `${d.seconds()} giây`;
    const minutes = (d.minutes() == 1) ? `${d.minutes()} phút` : `${d.minutes()} phút`;
    const clientStats = stripIndent`
      Servers   :: ${client.guilds.cache.size}
      Users     :: ${client.guilds.cache.reduce(
    (prev, guild) => prev + guild.memberCount, 0)}
      WS Ping   :: ${Math.round(client.ws.ping)}ms
      Uptime    :: ${days}, ${hours}, ${minutes} và ${seconds}
      Channels  :: ${client.channels.cache.size}
    
    `;
    
    const embed = new MessageEmbed()
      .setTitle('Bot\'s Statistics')
      .setDescription(`\`\`\`asciidoc\n${clientStats}\`\`\``)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
    }
}