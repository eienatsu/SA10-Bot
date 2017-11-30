exports.run = (client, message) => {
	const voiceChannel = message.member.voiceChannel;
	try {
		if (!voiceChannel) {
			message.channel.send('Not in the voice channel.');
		} else if (!message.guild.voiceConnection) {
			message.channel.send('Nothing playing.');
		} else if (message.guild.voiceConnection.dispatcher.paused) {
			message.channel.send('Already paused.');
		} else {
			message.guild.voiceConnection.dispatcher.pause();
			message.channel.send('Paused.');
		}
	} catch (e) {
		console.error(e);
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 0
};

exports.help = {
	name: 'pause',
	description: 'Pause currently playing song',
	usage: '[pause]'
};