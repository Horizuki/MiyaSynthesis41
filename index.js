const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client({ disableMentions: 'everyone' });
const responseObject = require("./responseObject.json");
const ms = require('ms')
const fs = require('fs');
const { promisify } = require("util");
const readdir = promisify(fs.readdir);
const snekfetch = require("snekfetch");
const config = require("./config.json");
const path = require('path');
const { DiscordTogether } = require('discord-together');
// const mongoose = require('mongoose');
const tempChannel = require("discord.js-temporary-channel");
const message = require('./events/guild/message');
const disbut = require('discord-buttons')

const activities = [
    "with the depression",
    "with Hasuki",
    "with someone probably not Mira",
    "with Ayuwu",
    "with a fishing rod.",
    "with Miya",
    "with a shotgun",
    "with Horizuki",
    "with an angel"
]

client.discordTogether = new DiscordTogether(client);


client.commands = new Discord.Collection();
client.events = new Discord.Collection();
['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})


client.queue = new Map();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");







client.once('ready', () => {
    console.log(`Xin chào Mira, đã đăng nhập ${client.user.tag} và đang ở trong ${client.guilds.cache.size} server với tổng cộng là ${client.users.cache.size} thành viên!`);
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities.length - 1) + 1);
        client.user.setActivity(activities[index]);
    }, 60000);
})

// client.on("error", console.error);

client.on('message', message => {
    if (message.content.split(' ')[0].includes(client.user.id) && message.content.split(' ').length == 1) {
        return message.channel.send(new Discord.MessageEmbed().setTitle("Invite").setURL("https://discord.com/oauth2/authorize?client_id=745590567353843753&scope=bot&permissions=268725336").setDescription(`**Hiển thị danh sách lệnh bằng:** \`${process.env.PREFIX}help\``).setColor('#ffddf4'))
    }
})

client.on('message', message => {
    if (responseObject[message.content]) {
        message.channel.send(responseObject[message.content]);
    }
});

// client.on('message', async message => {
//     if (message.author.bot) return false;
//     if (message.mentions.has(process.env.OWNERID)) {
//         message.reply(`my owner is busy right now. Can you mention her later?`);
//     }
// });


client.getUser = function (message, args) {
    if (message.mentions.users.first()) return message.mentions.users.first();
    if (!args[0]) return;
    return message.guild.members.cache.filter(m => {
        if (m.nickname && m.nickname.toLowerCase() === args[0].toLowerCase() || m.user.username.toLowerCase() === args[0].toLowerCase() || m.user.username.toLowerCase() + "#" + m.user.discriminator === args[0].toLowerCase() || m.user.id === args[0]) {
            return m;
        }
    }).first().user
}




tempChannel.autoCreateChannel(client, {
    userLimit: 20,
    reason: "powered by Mỉa",
    nameStartsWith: "Miya",
    nameStartsWithTemp: "*",
});


//     switch (cmd) {

//         case 'say':
//             let text = args.join(" "); //chưa học event handle nên ko biết bỏ vô folder, gomen đang đọc code thôi
//             msg.delete();
//             if (msg.member.hasPermission("MANAGE_CHANNELS")) {
//                 msg.channel.send(text)
//             } ekreply('bạn không có quyền để thực hiện lệnh này!') }
//             break;
// }
// nah i don't care this shit

disbut(client)

client.login(process.env.DISCORD_TOKEN);