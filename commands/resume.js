exports.run = (client, message) => {
	const voiceChannel = message.member.voiceChannel;
	try {
		if (!voiceChannel) {
			message.channel.send('Not in the voice channel.');
		} else if (!message.guild.voiceConnection) {
			message.channel.send('Nothing playing.');
		} else {
			message.guild.voiceConnection.dispatcher.resume();
			message.channel.send('Resumed.');
		}
	} catch (e) {
		console.error(e);
	}
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