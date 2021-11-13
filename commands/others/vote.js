module.exports = {
    name: "vote",
    emoji: "⬆️",
    permissions: [],
    cooldowns: 0,
    description: "vote cho Miya",

    async execute(client, Discord, message, cmd, args) {

        const embed = new Discord.MessageEmbed()
            .setTitle('Nhấn vào đây để vote!')
            .setURL("https://top.gg/bot/745590567353843753/vote")
            .setColor(message.member.displayHexColor)
            .setImage("https://i.imgur.com/l5YoIab.png")
            .setFooter("Hoặc quét mã QR để vote nhé")
        message.channel.send(embed)

    }
}