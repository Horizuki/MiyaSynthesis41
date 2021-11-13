const { DiscordTogether } = require('discord-together');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'chess',
    permissions: [],
    emoji: "",
    usage: "",
    cooldowns: 10,
    aliases: [],
    description: 'Chess Together (pc only)',
    async execute(client, Discord, message, cmd, args) {
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send(new Discord.MessageEmbed().setDescription("Bạn cần phải ở trong voice để thực hiện hành động này!").setColor('RED')).catch(console.error);

        client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'chess').then(async invite => {
            return message.channel.send(new Discord.MessageEmbed().setDescription(`[Nhấn vào đây để mở Chess](${invite.code})`).setColor("RANDOM"));
        });
        // const embed = new Discord.MessageEmbed()
        //     .setTitle("Nhấn vào đây để mở YouTube Together")
        //     .setURL(`${invite.code}`)
        //     .setColor("RANDOM")
        //     .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic : true}))

        // client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'youtube').then(async invite => {
        //     return message.channel.send(embed);
        // });

    }
}