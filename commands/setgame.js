exports.run = (client, message, args) => {
	const game = args.slice(0).join(' ');
	client.user.setGame(game);
	//message.channel.send(`${client.user} is now playing **"${game}"**.`);
	console.log(`DEBUG: setgame = "${game}"`);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['sg'],
	permLevel: 3
};

exports.help = {
	name: 'setgame',
	description: 'Set the game status',
	usage: 'setgame [command]'
};