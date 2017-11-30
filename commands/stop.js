exports.run = (client, message) => {
	//const voiceChannel = message.member.voiceChannel;
	try {
		if (!message.member.voiceChannel) {
			message.channel.send('Not in the voice channel.');
		} else if (!message.guild.voiceConnection) {
			message.channel.send('Nothing playing.');
		} else {
			//voiceChannel.leave();
			message.guild.voiceConnection.disconnect();
			return message.channel.send('Stopped.');
		}
	} catch (e) {
		console.error(e);
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['st'],
	permLevel: 0
};

exports.help = {
	name: 'stop',
	description: 'Stops the currently playing music.',
	usage: '[stop]'
};

