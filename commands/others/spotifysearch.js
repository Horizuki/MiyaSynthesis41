
module.exports = {
    name: "spotifysearch",
    aliases: ["ss", "ssearch"],
    permissions: [],
    emoji: "🎵",
    usage: "",
    cooldowns: 10,
    description: "tìm kiếm nhạc trên spotify",

    async execute(client, Discord, message, cmd, args) {
        let msglink = args.join('%20') // we're joining the args using %20, so if the args are Hello World it would be Hello%20World
        let msg = args.join(' ') // we're joining the args using a space. If you don't have the space Hello World would be HelloWorld

        if (!args[0]) return message.channel.send(new Discord.MessageEmbed() .setDescription('Làm ơn hãy nhập tên bài hát!') .setColor('RED'));

        let embed = new Discord.MessageEmbed() 
            .setColor('#33F304')
            .setDescription(`[${msg}](https://open.spotify.com/search/${msglink})`)

        message.channel.send(embed) // sending the embed
    }
}