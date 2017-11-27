exports.run = (client, message) => {
	const voiceChannel = message.member.voiceChannel;
	try {
		if (!voiceChannel) {
			message.channel.send('Not in the voice channel.');
		} else if (!message.guild.voiceConnection) {
			message.channel.send('Nothing playing.');
		} else {
			message.channel.send('Skipped.');
			message.guild.voiceConnection.dispatcher.end();
		}
	} catch (e) {
		console.error(e);
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['sk'],
	permLevel: 0
};

exports.help = {
	name: 'skip',
	description: 'Skip to the next track',
	usage: 'skip [command]'
};