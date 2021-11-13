const ms = require('ms')

module.exports = {
    name: "remind",
    permissions: [],
    cooldowns: 0,
    emoji: "⏰",
    usage: "<time> <message>",
    aliases: ['rm'],
    description: "Helps remind you something",
    async execute(client, Discord, message, cmd, args) {
        let time = args[0];
        let user = message.author
        let reminder = args.splice(1).join(' ')

        const notime = new Discord.MessageEmbed()
            .setColor('#F30B04')
            .setDescription(`**Làm ơn chọn thời gian! (d, m, h, s)**`)

        const wrongtime = new Discord.MessageEmbed()
            .setColor('#F30B04')
            .setDescription(`**Xin lỗi, thời gian hợp lệ là d (ngày), m (phút), h (giờ), hoặc s (giây).**`)

        const reminderembed = new Discord.MessageEmbed()
            .setColor('#F30B04')
            .setDescription(`**Vui lòng cho tôi biết bạn muốn được nhắc về điều gì.**`)

        if (!args[0]) return message.channel.send(notime)
        if (
            !args[0].endsWith("d") &&
            !args[0].endsWith("m") &&
            !args[0].endsWith("h") &&
            !args[0].endsWith("s")
        )


            return message.channel.send(wrongtime)
        if (!reminder) return message.channel.send(reminderembed)

        const remindertime = new Discord.MessageEmbed()
            .setColor('#33F304')
            .setDescription(`\**Bạn đã đặt remind trong thời gian ${time}.**`)

        message.channel.send(remindertime)

        const reminderdm = new Discord.MessageEmbed()
            .setColor('#7289DA')
            .setTitle('**LỜI NHẮC**')
            .setDescription(`**Đã hết ${time}. Đây là lời nhắc của bạn:** ${reminder}`)

        setTimeout(async function () {
            try {

                await user.send(reminderdm)
            } catch (err) {

            }

        }, ms(time));
    }
}