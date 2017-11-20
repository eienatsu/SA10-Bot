exports.run = function(client, message) {

	const dispatcher = message.guild.voiceConnection.playFile();
	message.channel.send('Stopped.').then(() => {
		dispatcher.end();
	});
	console.log('DEBUG: Stopped.');
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 0
};

exports.help = {
	name: 'stop',
	description: 'Stop music',
	usage: 'stop [command]'
};