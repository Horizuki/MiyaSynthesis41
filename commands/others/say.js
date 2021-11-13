module.exports = {
    name: "say",
    emoji: "🗨️",
    permissions: [],
    cooldowns: 0,
    description: "nói gì đó",

    async execute(client, Discord, message, cmd, args) {
        // if (message.content.includes("@everyone")) || (message.content.includes("@here")) return;
        // if (message.author.id !== '350144899489857536') return;
        let textChannel = message.mentions.channels.first()
        if (!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription("**Cách sử dụng:** msay <channel> <tin nhắn>.").setColor('RED'))
        if (!args[1]) return message.channel.send(new Discord.MessageEmbed().setDescription("**Hãy nhập tin nhắn.**").setColor('RED'))
        if (!message.guild.channels.cache.has(textChannel.id)) return; 
        message.delete()

        msg = args.slice(1).join(" ");
        textChannel.send(msg)

    }
}