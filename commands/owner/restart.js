module.exports = {
    name: "restart",
    aliases: ["res"],
    async execute(client, Discord, message, cmd, args) {
        if (message.author.id != process.env.OWNERID) return message.channel.send(new Discord.MessageEmbed().setDescription("Chỉ có người tạo ra tui mới có quyền sử dụng!").setColor('RED'))
        var spawn = require('child_process').spawn;

        await message.channel.send(new Discord.MessageEmbed().setDescription("Đang khởi động lại...").setColor('RANDOM'));
        if (process.env.process_restarting) {
            delete process.env.process_restarting;
            return;
        }

        spawn(process.argv[0], process.argv.slice(1), {
            env: { process_restarting: 1 },
            stdio: 'ignore',
            detached: true
        }).unref();

        await message.channel.send(new Discord.MessageEmbed().setDescription("Đã khởi động lại thành công!").setColor('GREEN'));
        process.exit();
    },
};