const block = "⬛";
const heart = ":red_square:";//put your own block emoji if you have smth
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "ship",
    emoji: "👩‍❤️‍💋‍👨",
    usage: "<user>",
    description: "đóng thuyền",
    async execute(client, Discord, message, cmd, args) {
        const user = message.mentions.users.first();
        if (!user) return message.channel.send(new Discord.MessageEmbed().setDescription(`**Bạn muốn đóng thuyền với ai?**`).setColor('RED'))
        if (user && user.id === message.author.id) {
            return message.channel.send(new Discord.MessageEmbed().setDescription(`**Bủh tự bắt cặp với bản thân.**`).setColor('RED'))
        }
        if (message.mentions.users.size < 2) {
            let loveEmbed = new MessageEmbed()
                .setColor('dd2e44')
                .setTitle('Shipping...')
                .setDescription(`Đã ship ${message.author} và ${user}!`)
                .setImage(`https://api.popcatdev.repl.co/ship?user1=${message.author.displayAvatarURL({ dynamic: false, format: "png" })}&user2=${user.displayAvatarURL({ dynamic: false, format: "png" })}`)
                .addField(`**Ship Meter**`, ship())

            return message.channel.send(loveEmbed)
        } else if (message.mentions.users.size > 1) {
            let luv = new MessageEmbed()
                .setColor('dd2e44')
                .setTitle('Shipping...')
                .setDescription(`Shipped ${message.mentions.users.first()} and ${message.mentions.users.last()}!`)
                .setImage(`https://api.popcatdev.repl.co/ship?user1=${message.mentions.users.first().displayAvatarURL({ dynamic: false, format: "png" })}&user2=${message.mentions.users.last().displayAvatarURL({ dynamic: false, format: "png" })}`)
                .addField(`**Ship Meter**`, ship())
            message.channel.send(luv)
        }
    }
}

function ship() {
    const hearts = Math.floor(Math.random() * 110) + 0;
    const hearte = (hearts / 10)

    const str = `${heart.repeat(hearte)}${block.repeat(11 - hearte)} ${hearts}%`;
    return str;
}