require('dotenv').config();
const cooldowns = new Map();
const db = require("quick.db");
const ms = require("ms");

module.exports = async (Discord, client, message) => {

    const prefix = process.env.PREFIX;
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));
    if (!command) return;

    let blacklisted = db.get(`blacklist_${message.author.id}`) //here the bot is searching if the person typing is blacklisted

    if (blacklisted === 1) return message.channel.send(new Discord.MessageEmbed().setDescription(`**Bạn không có quyền để thực hiện lệnh này.**`).setColor('RED')) //if it is blacklisted then you can return; 

    const validPermissions = [
        "CREATE_INSTANT_INVITE",
        "KICK_MEMBERS",
        "BAN_MEMBERS",
        "ADMINISTRATOR",
        "MANAGE_CHANNELS",
        "MANAGE_GUILD",
        "ADD_REACTIONS",
        "VIEW_AUDIT_LOG",
        "PRIORITY_SPEAKER",
        "STREAM",
        "VIEW_CHANNEL",
        "SEND_MESSAGES",
        "SEND_TTS_MESSAGES",
        "MANAGE_MESSAGES",
        "EMBED_LINKS",
        "ATTACH_FILES",
        "READ_MESSAGE_HISTORY",
        "MENTION_EVERYONE",
        "USE_EXTERNAL_EMOJIS",
        "VIEW_GUILD_INSIGHTS",
        "CONNECT",
        "SPEAK",
        "MUTE_MEMBERS",
        "DEAFEN_MEMBERS",
        "MOVE_MEMBERS",
        "USE_VAD",
        "CHANGE_NICKNAME",
        "MANAGE_NICKNAMES",
        "MANAGE_ROLES",
        "MANAGE_WEBHOOKS",
        "MANAGE_EMOJIS",
    ]


    if (command.permissions && command.permissions.length) {
        let invalidPerms = []
        for (const perm of command.permissions) {
            if (!validPermissions.includes(perm)) {
                return console.log(`Invalid Permissions ${perm}`);
            }
            if (!message.member.hasPermission(perm)) {
                invalidPerms.push(perm);
            }
        }
        if (invalidPerms.length) {
            return message.channel.send(new Discord.MessageEmbed().setDescription(`Bạn không có \`${invalidPerms}\` để sử dụng lệnh này!`).setColor('RED'))
        }
    }

    if (!message.content.startsWith(prefix)) return;

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const current_time = Date.now();
    const time_stamps = cooldowns.get(command.name);
    const cooldown_amount = (command.cooldown) * 1000;

    if (time_stamps.has(message.author.id)) {
        const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;

        if (current_time < expiration_time) {
            const time_left = (expiration_time - current_time) / 1000;
            return message.channel.send(new Discord.MessageEmbed().setDescription(`Làm ơn chờ **${time_left.toFixed(1)} giây** để sử dụng.`).setColor('RED'))
        }
    }

    time_stamps.set(message.author.id, current_time);
    setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);

    try {
        command.execute(client, Discord, message, cmd, args);
    } catch (err) {
        message.channel.send(new Discord.MessageEmbed().setDescription(`Có lỗi xảy ra trong quá trình xài lệnh!`).setColor('RED'))
        console.log(err);
    }
}