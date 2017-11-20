exports.run = function(client, message) {

	const dispatcher = message.guild.voiceConnection.playFile();
	message.channel.send('Paused.').then(() => {
		dispatcher.pause();
	});
	console.log('DEBUG: Paused');
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 0
};

exports.help = {
	name: 'pause',
	description: 'Pause the music',
	usage: 'pause [command]'
};