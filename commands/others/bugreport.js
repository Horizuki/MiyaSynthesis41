
module.exports = {
    name: "bugreport",
    aliases: ['bug', 'reportbug', 'report'],
    emoji: "🐛",
    usage: "<bugs>",
    description: 'Báo lỗi',
    async execute(client, Discord, message, cmd, args) {
        const channel = client.channels.cache.get('852495113615835136')

        const query = args.join(' ');
        if (!query) return message.channel.send(new Discord.MessageEmbed().setDescription('Tui lỗi ở chỗ nào hãy kể ra làm ơn!').setColor('RED'))

        const reportEmbed = new Discord.MessageEmbed()
            .setTitle('New Bug!')
            .setColor(message.member.displayHexColor)
            .addField('Author', message.author.toString(), true)
            .addField('Server', message.guild.name, true)
            .addField('Report', query)
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
        channel.send(reportEmbed);
        message.channel.send(new Discord.MessageEmbed().setDescription("**Đã gửi lỗi về cho owner bot!**").setColor('#33F304'))
    }
}