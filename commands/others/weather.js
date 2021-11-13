const weather = require('weather-js');

module.exports = {
    name: 'weather',
    permissions: [],
    cooldowns: 0,
    emoji: "🌧️",
    usage: "<location>",
    aliases: ['wthr', 'wt'],
    descriptionn: 'Xem thời tiết',
    async execute(client, Discord, message, cmd, args) {

        weather.find({ search: args.join(" "), degreeType: 'C' }, function (error, result) {
            // 'C' can be changed to 'F' for farneheit results
            if (error) return message.channel.send(error);
            if (!args[0]) return message.channel.send('Làm ơn chọn địa điểm!');

            if (result === undefined || result.length === 0) return message.channel.send(new Discord.MessageEmbed() .setDescription('**Không tìm thấy địa điểm này.**') .setColor('RED'));

            var current = result[0].current;
            var location = result[0].location;

            const weatherinfo = new Discord.MessageEmbed()
                .setDescription(`**${current.skytext}**`)
                .setAuthor(`Weather forecast for ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setColor("RANDOM")
                .addField('Múi giờ', `UTC${location.timezone}`, true)
                .addField('Đơn vị', 'Celsius', true)
                .addField('Nhiệt độ', `${current.temperature}°`, true)
                .addField('Gió', current.winddisplay, true)
                .addField('Có cảm giác như', `${current.feelslike}°`, true)
                .addField('Độ ẩm', `${current.humidity}%`, true)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
            message.channel.send(weatherinfo)
        })
    }
}
