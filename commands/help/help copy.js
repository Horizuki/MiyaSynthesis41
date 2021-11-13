const {
    MessageEmbed,
    Message,
    Client
} = require("discord.js");
const {
    readdirSync
} = require("fs");
//   const prefix = require("../../config.json").prefix;
let color = "#fce9ed"

module.exports = {
    name: "help",
    aliases: ['h'],
    emoji: "📰",
    description: "Xem danh sách tất cả các lệnh",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String} args 
     * @returns 
  
     */
    execute: async (client, Discord, message, cmd, args) => {

        if (!args[0]) {
            let categories = [];


            //categories to ignore
            let ignored = [
                "mtest",
                "owner",
                "help"
            ];

            const emo = {
                others: "🎆",
                info: "📌",
                moderation: "🔨",
                music: "🎶",
                action: "🏃‍♂️",
                games: "🎮",
            }

            readdirSync("./commands/").forEach((dir) => {
                if (ignored.includes(dir.toLowerCase())) return;
                const name = `${emo[dir.toLowerCase()]} ${dir.toUpperCase()}`
                let cats = new Object();

                cats = {
                    name: name,
                    value: `\`${process.env.PREFIX}help ${dir.toLowerCase()}\``,
                    inline: true
                }


                categories.push(cats);
                //cots.push(dir.toLowerCase());
            });

            const embed = new MessageEmbed()
                .setTitle("Help Menu:")
                .setDescription(
                    `\`\`\`js\nPrefix: ${process.env.PREFIX}\nParameters: <> = required, [] = optional\`\`\`\n[Invite me](https://discord.com/oauth2/authorize?client_id=745590567353843753&scope=bot&permissions=268725336)\n\nSử dụng \`${process.env.PREFIX}help [category]\` để biết trong category đó gồm có những gì!\n\n__**Categories**__`
                )
                .addFields(categories)
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
                .setTimestamp()
                .setThumbnail(client.user.displayAvatarURL({
                    dynamic: true
                }))
                .setColor(color);

            return message.channel.send(embed);
        } else {
            let cots = [];
            let catts = [];

            readdirSync("./commands/").forEach((dir) => {
                if (dir.toLowerCase() !== args[0].toLowerCase()) return;
                const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                    file.endsWith(".js")
                );


                const cmds = commands.map((command) => {
                    let file = require(`../../commands/${dir}/${command}`);

                    if (!file.name) return "No command name.";

                    let name = file.name.replace(".js", "");

                    let des = client.commands.get(name).description;
                    let emo = client.commands.get(name).emoji;

                    let obj = {
                        cname: `${emo} - \`${name}\``,
                        des
                    }

                    return obj;
                });

                let dota = new Object();

                cmds.map(co => {
                    dota = {
                        name: `${cmds.length === 0 ? "In progress." : co.cname}`,
                        value: co.des ? co.des : 'No Description',
                        inline: true,
                    }
                    catts.push(dota)
                });

                cots.push(dir.toLowerCase());
            });

            console.log(cots);

            const command =
                client.commands.get(args[0].toLowerCase()) ||
                client.commands.find(
                    (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
                );

            if (cots.includes(args[0].toLowerCase())) {
                const combed = new MessageEmbed()
                    .setTitle(`__${args[0].charAt(0).toUpperCase() + args[0].slice(1)} Commands!__`)
                    .setDescription(`Sử dụng \`${process.env.PREFIX}help <command>\` để biết thêm thông tin về lệnh đó.\nVí dụ: \`${process.env.PREFIX}help ping\`.\n\n`)
                    .addFields(catts)
                    .setColor(color)

                return message.channel.send(combed)
            }

            if (!command) {
                const embed = new MessageEmbed()
                    .setTitle(`câu lệnh không hợp lệ! Sử dụng \`${process.env.PREFIX}help\` để xem danh sách lệnh!`)
                    .setColor("RED");
                return message.channel.send(embed);
            }

            const embed = new MessageEmbed()
                .setTitle("Thông tin chi tiết:")
                .addField(
                    "Command:",
                    command.name ? `\`${command.name}\`` : "Không có tên cho lệnh này."
                )
                .addField(
                    "Tên khác:",
                    command.aliases ?
                        `\`${command.aliases.join("` `")}\`` :
                        "Không có tên khác cho lệnh này."
                )
                .addField(
                    "Cách sử dụng:",
                    command.usage ?
                        `\`${process.env.PREFIX}${command.name} ${command.usage}\`` :
                        `\`${process.env.PREFIX}${command.name}\``
                )
                .addField(
                    "Mô tả:",
                    command.description ?
                        command.description :
                        "Không có mô tả cho lệnh này."
                )
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
                .setTimestamp()
                .setColor(color);
            return message.channel.send(embed);
        }
    },
};