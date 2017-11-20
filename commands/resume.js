exports.run = (client, message) => {

	const dispatcher = message.guild.voiceConnection.playFile();
	message.channel.send('Resumed.').then(() => {
		dispatcher.resume();
	});
	console.log('DEBUG: Resumed');
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['r'],
	permLevel: 0
};

exports.help = {
	name: 'resume',
	description: 'Resume music',
	usage: 'resume [command]'
};