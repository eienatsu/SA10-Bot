exports.run = async (client, message) => {
	await message.channel.send('Pinging nexon servers...');
	message.channel.send(`\`Ping:${message.createdTimestamp - message.createdTimestamp}ms
You obviously can't play Mabi optimally. Quit now.\``);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 0
};

exports.help = {
	name: 'ping',
	description: '*For testing only',
	usage: 'ping [command]'
};