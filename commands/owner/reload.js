
module.exports = {
    name: 'reload',
    category: 'Dev',
    aliases: ['rl'],
    permissions: [],
    cooldown: 0,
    description: 'Reloads cmd',
    execute: async (client, Discord, message, cmd, args) => {
        if (message.author.id != process.env.OWNERID) return message.channel.send(new Discord.MessageEmbed().setDescription("Chỉ có người tạo ra tui mới có quyền sử dụng!").setColor('RED'))
        if (!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription('Bạn cần phải nhập category!').setColor('RED'))
        if (!args[1]) return message.channel.send(new Discord.MessageEmbed().setDescription('Bạn cần phải nhập lệnh muốn reload!').setColor('RED'))
        let category = args[0];
        let command = args[1].toLowerCase();
        try {
            delete require.cache[require.resolve(`../../commands/${category}/${command}.js`)]
            client.commands.delete(command);
            const pull = require(`../../commands/${category}/${command}.js`);
            client.commands.set(command, pull);

            return message.channel.send(new Discord.MessageEmbed().setDescription(`Đã reload **${command}**!`).setColor('RED'))
        } catch (error) {
            return message.channel.send(new Discord.MessageEmbed().setDescription(`Đã có lỗi xảy ra khi reload **${command}**: \`${error.message}\``).setColor('RED'))
        }
    }
}