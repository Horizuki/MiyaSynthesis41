module.exports = {
    name: 'prune',
    cooldown: 5,
    aliases: ["purge", "clear"],
    emoji: "💨",
    permissions: ["MANAGE_MESSAGES"],
    desc: 'xóa tin nhắn',
    async execute(client, Discord, message, cmd, args) {
        if (!message.guild.me.permissions.has("MANAGE_MESSAGES"))
      return message.channel.send(new Discord.MessageEmbed().setDescription(`Miya không có \`MANAGE_MESSAGES\` để sử dụng lệnh này!`).setColor('RED'))
        if (!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription("Làm ơn nhập số lượng tin nhắn bạn muốn xóa!").setColor('RED'))
        if (isNaN(args[0])) return message.channel.send(new Discord.MessageEmbed().setDescription("Làm ơn hãy nhập số nguyên!").setColor('RED'))

        if (args[0] > 100) return message.channel.send(new Discord.MessageEmbed().setDescription("mình không thể xóa được hơn 100 tin nhắn! ||và tất nhiên chẳng con bot nào làm được||").setColor('RED'))
        if (args[0] < 1) return message.channel.send(new Discord.MessageEmbed().setDescription('làm ơn hãy nhập số nguyên dương!').setColor('RED'))

        await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
            message.channel.bulkDelete(messages);
        });
    }
}