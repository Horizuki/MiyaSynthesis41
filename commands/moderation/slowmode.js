
module.exports = {
    name: 'slowmode',
    aliases: ['sm'],
    permissions: ["MANAGE_CHANNELS"],
    emoji: "🐢",
    cooldown: 3,
    description: 'đặt chế độ chậm cho channel',
async execute(client, Discord, message, cmd, args){
    if (!message.guild.me.permissions.has("MANAGE_CHANNELS"))
    return message.channel.send(new Discord.MessageEmbed().setDescription(`Miya không có \`MANAGE_CHANNELS\` để sử dụng lệnh này!`).setColor('RED'))
    if (!args[0]) return message.channel.send(new Discord.MessageEmbed() .setDescription('Args không hợp lệ: Bạn muốn đặt chế độ làm chậm thành gì?') .setColor('RED'));
    if(isNaN(args[0])) return message.channel.send(new Discord.MessageEmbed() .setDescription('Làm ơn hãy nhập số thực!') .setColor('RED'));
    if (args[0] > 21600 || args[0] < 1) return message.channel.send(new Discord.MessageEmbed() .setDescription('Số đó phải trong phạm vi từ 1 - 21600.') .setColor('RED'))

    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) || message.channel

        channel.setRateLimitPerUser(args[0])
        message.channel.send(new Discord.MessageEmbed() .setDescription(`Đã chỉnh chế độ chậm thành ${args[0]}`) .setColor('RED'))
        return;

    message.channel.send(new Discord.MessageEmbed() .setDescription(`Đã chỉnh chế độ chậm thành ${args[0]}`) .setColor('RED'))

    .catch((e) => {
        message.channel.send('Error Occured!')
        e ? console.error(e) : console.log('Lỗi không xác định!')
    })
}
}