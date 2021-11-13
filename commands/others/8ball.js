const { MessageEmbed } = require('discord.js');

module.exports = {
    name: '8ball',
    aliases: ['8b', 'eightball'],
    emoji: "🎱",
    usage: "<message>",
    permissions: [],
    cooldowns: 2,
    description: 'Bạn hỏi, Miya trả lời',
    async execute(client, Discord, message, cmd, args) {
        if (!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription('**Làm ơn đặt câu hỏi!**').setColor('RED'))
        const replies = [
            'Có.',
            'Không.',
            'Không bao giờ.',
            'Chắc chắn.',
            'Tại sao câu hỏi này lại tồn tại?',
            'Chắc chắn là như vậy.',
            'Rất có thể là không.',
            'Như Miya thấy, có.',
            'Làm ơn hỏi lại sau.',
            'Tốt hơn Miya không nói cho bạn biết bây giờ.',
            'Không thể đoán được...',
            'Làm ơn hỏi lại lần nữa.',
            'Câu trả lời của Miya là không.',
            'Có vẻ không được ổn cho lắm.',
            'Chắc chắn là có rồi.',
            'Có lẽ là không.',
            'Có thể là có.',
            'Miya chắn chắc câu trả lời là không luôn!',
            'Có, chắc chắn là có!',
            'Hmmm, câu này hơi nan giải.'
        ];

        const result = Math.floor(Math.random() * replies.length); // Get a random respons for the array
        const question = args.join(' '); // join the args(Array<string>) to a question string
        // check permissions for embed
        if (message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
            const embed = new MessageEmbed() // create embed 
                .setAuthor('🎱 The 8 Ball says...')
                .setColor(message.member.displayHexColor).addField('Câu hỏi:', question)
                .addField('Câu trả lời là:', replies[result])
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            await message.channel.send(embed); // send embed message
        } else {
            await message.channel.send(`**Câu hỏi:**\n${question}\n**Câu trả lời:**\n${replies[result]}`); 
        }
    },
};