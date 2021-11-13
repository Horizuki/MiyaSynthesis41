const { MessageEmbed } = require('discord.js')
const quick = require('quick.db')


module.exports = {
  name: 'ping',
  permissions: [],
  emoji: "🏓",
  usage: "",
  cooldowns: 5,
  description: 'Tình trạng ping của bot!',
  async execute(client, Discord, message, cmd, args) {
    const ping = await getDBPingData();
    const messagePing = Date.now(); // start before message sent
    const msg = await message.channel.send('<:rushia_LAGG:746262150468599838> Đang tải... ');
    const endMessagePing = Date.now() - messagePing; // end of message sent

    const embed = new MessageEmbed() // build message embed
      .setDescription(
        `
          Database ping data:
          - Fetch ping: \`${ping.endGet}ms\`
          - Wright ping: \`${ping.endWright}ms\`
          - Avrage ping: \`${ping.avarage}ms\`
          Message ping: \`${endMessagePing}ms\`
        `
      )
      .setColor("RANDOM")
      .setTimestamp();

    msg.edit({
      content: '',
      embed,
    });
  },
};

async function getDBPingData() {
  // get the fetch data ping
  const startGet = Date.now();
  await quick.get('QR=.');
  const endGet = Date.now() - startGet;

  // get the wright data ping
  const startWright = Date.now();
  await quick.set('QR=.', Buffer.from(startWright.toString()).toString('base64'));
  const endWright = Date.now() - startWright;

  // avrage ping time
  const avarage = (endGet + endWright) / 2;
  try {
    quick.delete('QR=.'); // try deleteing
  } catch (error) { }
  return { endGet, endWright, avarage }; // return the ping data
}

